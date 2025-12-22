// Simple integration test for backend endpoints
import "dotenv/config";
import fetch from "node-fetch";

const BASE = process.env.BASE_URL || "http://localhost:4000";

async function run() {
  console.log("Testing", BASE);
  // Test dashboard
  const dash = await fetch(`${BASE}/clients/alpha-shop/dashboard`);
  console.log("/dashboard", dash.status);
  console.log(await dash.text());

  // Test login
  const login = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "alice@alpha-shop.com",
      password: "password123",
    }),
  });
  console.log("/auth/login", login.status);
  console.log(await login.text());

  // Test creating inventory
  const createInv = await fetch(`${BASE}/clients/alpha-shop/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sku: "TEST-1", quantity: 5 }),
  });
  console.log("/inventory POST", createInv.status);
  console.log(await createInv.text());

  // Test listing inventory
  const listInv = await fetch(`${BASE}/clients/alpha-shop/inventory`);
  console.log("/inventory GET", listInv.status);
  console.log(await listInv.text());
}

run().catch((e) => {
  console.error("integration test failed", e);
  process.exit(1);
});
