Backend developer notes
======================

Run the backend (development)
-----------------------------

1. Start the mock+DB server:

   ```fish
   cd backend
   npm install
   npm run dev
   ```

2. Environment

- `.env` contains `DATABASE_URL`. For local dev we use SQLite `file:./dev.db` by default.

Prisma
------

- Prisma config is in `prisma.config.ts`. The runtime `PrismaClient` will pick up `DATABASE_URL` from `.env`.
- To regenerate the client:

  ```fish
  cd backend
  npx prisma generate
  npx prisma db push --accept-data-loss
  ```

Notes
-----
- The server runs mock endpoints (`/clients/:clientId/dashboard`) and will persist users into the local SQLite DB when they login via `/auth/login`.
- Passwords are hashed when persisted into the local DB (development only). Do not use this pattern in production without proper security review.

API Endpoints (dev)
-------------------

- `GET /clients/:clientId/dashboard` — returns mock dashboard metrics.
- `POST /auth/login` — authenticates a user; will persist a user into the local DB if not present (passwords are hashed).
- `GET /clients/:clientId/inventory` — lists inventory items for the tenant (Prisma-backed).
- `POST /clients/:clientId/inventory` — creates an inventory item for the tenant (Prisma-backed).
- `GET /clients/:clientId/tenant` — returns tenant info from the DB (Prisma-backed).
- `GET /clients/:clientId/orders` — returns mocked orders from `CLIENT_MOCKS`.

If you want me to wire more production-ready endpoints or add migrations, tell me which area to prioritize (inventory, orders, tenants).

Migration notes
---------------

- In-memory inventory fallback has been removed and endpoints now require Prisma to be available. To migrate any previously stored in-memory items (from an earlier dev run), run the `POST /internal/migrate-inventory` endpoint (I can add it if you want) or restart the server after persisting items via an ad-hoc script.
