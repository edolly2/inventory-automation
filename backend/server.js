import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const app = express();
// Allow requests from the frontend dev server by default
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin like curl or server-to-server
      if (!origin) return callback(null, true);
      if (origin === FRONTEND_ORIGIN) return callback(null, true);
      // allow all in development
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

// Simple in-memory fake users (mirror frontend mock)
const FAKE_USERS = [
  {
    id: "u1",
    name: "Alice Manager",
    email: "alice@alpha-shop.com",
    password: "password123",
    clientId: "alpha-shop",
    role: "admin",
  },
  {
    id: "u2",
    name: "Bob Ops",
    email: "bob@beta-warehouse.com",
    password: "password123",
    clientId: "beta-warehouse",
    role: "manager",
  },
];

// Basic auth route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing credentials" });
  // Try to use the DB if available: find or create the user in the database.
  try {
    // Lazy-global Prisma client to avoid multiple instances during hot reloads
    global.__prisma ||= new PrismaClient();
    const prisma = global.__prisma;

    // Look up user by email in DB
    let dbUser = await prisma.user.findUnique({ where: { email } });

    // If not found, fall back to the in-memory list and persist into DB for future calls
    if (!dbUser) {
      const mem = FAKE_USERS.find(
        (u) => u.email.toLowerCase() === String(email).toLowerCase()
      );
      if (!mem || mem.password !== password) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Persist a user record, hashing the password for dev safety
      const hashed = await bcrypt.hash(mem.password, 10);
      dbUser = await prisma.user.create({
        data: {
          email: mem.email,
          password: hashed,
          tenantId: mem.clientId,
        },
      });
    } else {
      // If user exists in DB, check password using bcrypt if password hash present
      if (dbUser.password) {
        const ok = await bcrypt.compare(password, dbUser.password);
        if (!ok) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid email or password" });
        }
      }
    }

    const token = `db-token-${dbUser.id}-${Date.now()}`;
    return res.json({
      success: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        clientId: dbUser.tenantId,
        token,
      },
    });
  } catch (err) {
    // If anything goes wrong with Prisma, fallback to memory-only behavior
    console.error("Prisma error in /auth/login:", err?.message || err);
    const user = FAKE_USERS.find(
      (u) => u.email.toLowerCase() === String(email).toLowerCase()
    );
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = `fake-token-${user.id}-${Date.now()}`;
    return res.json({ success: true, user: { ...user, token } });
  }
});

// Signup route: create tenant and admin user
app.post("/api/signup", async (req, res) => {
  const { adminName, companyName, companyAddress, email, password } =
    req.body || {};
  if (!email || !password || !companyName)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const prisma = getPrisma();
    // create tenant with id derived from companyName (simple slug)
    const tenantId = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    await ensureTenant(prisma, tenantId);

    // create user (admin)
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, tenantId },
    });

    // Return minimal user + token
    return res.json({
      success: true,
      user: { id: user.id, email: user.email, clientId: tenantId },
    });
  } catch (err) {
    console.error(
      "Signup failed, falling back to in-memory:",
      err?.message || err
    );
    // fallback: add to FAKE_USERS
    const clientId = companyName
      ? companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "local";
    const id = `u-${Date.now()}`;
    FAKE_USERS.push({
      id,
      name: adminName || "Admin",
      email,
      password,
      clientId,
      role: "admin",
    });
    return res.json({ success: true, user: { id, email, clientId } });
  }
});

// Simple dashboard data per client (mocked)
const CLIENT_MOCKS = {
  "alpha-shop": {
    metrics: {
      totalSkus: 350,
      lowStockCount: 18,
      openOrders: 42,
      fulfillmentRate: 0.82,
    },
    trends: [
      { label: "Mon", value: 120 },
      { label: "Tue", value: 140 },
      { label: "Wed", value: 130 },
      { label: "Thu", value: 160 },
      { label: "Fri", value: 180 },
    ],
    topProducts: [
      {
        id: "BP-100",
        name: "Brake Pads A",
        sku: "BP-100",
        sold: 52,
        stock: 120,
      },
      {
        id: "AF-300",
        name: "Air Filter X",
        sku: "AF-300",
        sold: 37,
        stock: 80,
      },
    ],
  },
  "beta-warehouse": {
    metrics: {
      totalSkus: 1200,
      lowStockCount: 75,
      openOrders: 10,
      fulfillmentRate: 0.92,
    },
    trends: [
      { label: "Mon", value: 300 },
      { label: "Tue", value: 310 },
      { label: "Wed", value: 295 },
      { label: "Thu", value: 330 },
      { label: "Fri", value: 345 },
    ],
    topProducts: [
      {
        id: "PS-120",
        name: "Pallet Screw Pack",
        sku: "PS-120",
        sold: 100,
        stock: 400,
      },
      {
        id: "WG-040",
        name: "Warehouse Gloves",
        sku: "WG-040",
        sold: 64,
        stock: 200,
      },
    ],
  },
};

app.get("/clients/:clientId/dashboard", (req, res) => {
  const { clientId } = req.params;
  const mock = CLIENT_MOCKS[clientId];
  if (!mock) return res.status(404).json({ error: "Client not found" });
  return res.json(mock);
});

// Prisma-backed endpoints: tenants, inventory, orders
function getPrisma() {
  // Reuse a global PrismaClient during dev/hot-reload
  if (!global.__prisma) {
    try {
      global.__prisma = new PrismaClient();
    } catch (err) {
      console.error("Prisma initialization failed:", err?.message || err);
      throw err;
    }
  }
  return global.__prisma;
}

// Ensure tenant exists (create if missing)
async function ensureTenant(prisma, clientId) {
  return prisma.tenant.upsert({
    where: { id: clientId },
    update: {},
    create: { id: clientId, name: clientId },
  });
}

// List inventory for a tenant
app.get("/clients/:clientId/inventory", async (req, res) => {
  // Try Prisma, fall back to in-memory store on failure
  try {
    const prisma = getPrisma();
    const { clientId } = req.params;
    const items = await prisma.inventory.findMany({
      where: { tenantId: clientId },
    });
    return res.json({ items });
  } catch (err) {
    console.warn(
      "Prisma unavailable, falling back to sqlite3 CLI inventory read:",
      err?.message || err
    );
    try {
      const dbPath =
        process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("file:")
          ? process.env.DATABASE_URL.replace(/^file:\/\//, "").replace(
              /^file:/,
              ""
            )
          : "dev.db";
      const sql = `SELECT id, sku, quantity FROM Inventory WHERE tenantId='${String(
        req.params.clientId
      ).replace(/'/g, "''")}'`;
      // Try JSON output (modern sqlite3). If it fails, fall back to CSV parsing.
      try {
        const out = execFileSync("sqlite3", [dbPath, "--json", sql], {
          encoding: "utf8",
        });
        const parsed = JSON.parse(out || "[]");
        const items = parsed.map((r) => ({
          id: r.id,
          sku: r.sku,
          quantity: r.quantity,
        }));
        return res.json({ items });
      } catch (eJson) {
        const out = execFileSync("sqlite3", [dbPath, "-csv", sql], {
          encoding: "utf8",
        });
        const lines = out.trim() ? out.trim().split(/\r?\n/) : [];
        const items = lines.map((ln) => {
          const [id, sku, quantity] = ln.split(",");
          return { id, sku, quantity: Number(quantity) };
        });
        return res.json({ items });
      }
    } catch (e2) {
      console.warn(
        "sqlite3 read fallback failed, returning empty list:",
        e2?.message || e2
      );
      return res.json({ items: [] });
    }
  }
});

// Create inventory item for a tenant
app.post("/clients/:clientId/inventory", async (req, res) => {
  const { clientId } = req.params;
  const { sku, quantity } = req.body || {};
  if (!sku || typeof quantity !== "number")
    return res.status(400).json({ error: "missing sku or quantity" });

  try {
    const prisma = getPrisma();
    await ensureTenant(prisma, clientId);
    const item = await prisma.inventory.create({
      data: { tenantId: clientId, sku, quantity },
    });
    return res.status(201).json(item);
  } catch (err) {
    console.warn(
      "Prisma unavailable for create, writing via sqlite3 CLI:",
      err?.message || err
    );
    try {
      const dbPath =
        process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("file:")
          ? process.env.DATABASE_URL.replace(/^file:\/\//, "").replace(
              /^file:/,
              ""
            )
          : "dev.db";
      const id = `cli-${Date.now()}`;
      const sql = `INSERT INTO Inventory (id, tenantId, sku, quantity, createdAt) VALUES ('${String(
        id
      ).replace(/'/g, "''")}', '${String(clientId).replace(
        /'/g,
        "''"
      )}', '${String(sku).replace(/'/g, "''")}', ${Number(
        quantity
      )}, datetime('now'))`;
      execFileSync("sqlite3", [dbPath, sql]);
      return res.status(201).json({ id, sku, quantity });
    } catch (e2) {
      console.error("sqlite3 write fallback failed", e2?.message || e2);
      return res.status(500).json({ error: "inventory create failed" });
    }
  }
});

// Internal endpoint: migrate in-memory inventory into SQLite DB (idempotent)
app.post("/internal/migrate-inventory", async (req, res) => {
  try {
    const prisma = getPrisma();
    const store = global.__inventoryStore || {};
    const created = [];
    for (const [clientId, items] of Object.entries(store)) {
      await ensureTenant(prisma, clientId);
      for (const it of items) {
        const c = await prisma.inventory.create({
          data: { tenantId: clientId, sku: it.sku, quantity: it.quantity },
        });
        created.push(c);
      }
    }
    // clear in-memory store after migration
    global.__inventoryStore = {};
    return res.json({ migrated: created.length });
  } catch (err) {
    console.error("migration failed", err?.message || err);
    return res.status(500).json({ error: "migration failed" });
  }
});

// List tenant info
app.get("/clients/:clientId/tenant", async (req, res) => {
  try {
    const prisma = getPrisma();
    const { clientId } = req.params;
    const tenant = await prisma.tenant.findUnique({ where: { id: clientId } });
    if (!tenant) return res.status(404).json({ error: "tenant not found" });
    return res.json(tenant);
  } catch (err) {
    console.error("tenant fetch error", err?.message || err);
    return res.status(500).json({ error: "tenant fetch failed" });
  }
});

// Simple orders endpoint (mocked persistence)
app.get("/clients/:clientId/orders", async (req, res) => {
  // For now return mocked orders derived from CLIENT_MOCKS if present
  const { clientId } = req.params;
  const mock = CLIENT_MOCKS[clientId];
  if (!mock) return res.status(404).json({ error: "Client not found" });
  return res.json({ orders: mock.orders || [] });
});

// Start the server (keep this simple for local dev)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

// Fallback migration using sqlite3 CLI when Prisma client cannot be constructed
import { execFileSync } from "child_process";

app.post("/internal/migrate-inventory-sqlite", async (req, res) => {
  try {
    const store = global.__inventoryStore || {};
    let migrated = 0;
    const dbPath =
      process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("file:")
        ? process.env.DATABASE_URL.replace(/^file:\/\//, "").replace(
            /^file:/,
            ""
          )
        : "dev.db";

    for (const [clientId, items] of Object.entries(store)) {
      for (const it of items) {
        // Use sqlite3 CLI to insert row directly
        const sql = `INSERT INTO Inventory (id, tenantId, sku, quantity, createdAt) VALUES ('${String(
          it.id
        ).replace(/'/g, "''")}', '${String(clientId).replace(
          /'/g,
          "''"
        )}', '${String(it.sku).replace(/'/g, "''")}', ${Number(
          it.quantity
        )}, datetime('now'))`;
        execFileSync("sqlite3", [dbPath, sql]);
        migrated++;
      }
    }
    // clear in-memory store
    global.__inventoryStore = {};
    return res.json({ migrated });
  } catch (err) {
    console.error("sqlite migration failed", err?.message || err);
    return res.status(500).json({ error: "sqlite migration failed" });
  }
});
