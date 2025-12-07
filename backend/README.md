Lumina Backend (Prototype)

This is a minimal Express backend used as a development prototype for the Lumina app. It provides:

- POST /api/register — register new user (returns JWT)
- POST /api/login — login and receive JWT
- GET /api/posts — list posts
- POST /api/posts — create post (requires Bearer token)
- DELETE /api/posts/:id —const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:8081"],
  credentials: true
})); delete post (author or admin)

Storage
- Uses `lowdb` (JSON file) located at `backend/db.json`.

Admin seeding
- On first run, if there are no users, the server will seed an admin user using environment variables or defaults:
  - ADMIN_EMAIL (default `admin@local`)
  - ADMIN_PASSWORD (default `admin123`)
  - ADMIN_NAME (default `Admin`)

Run locally
1. Open a terminal in `backend/`
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start server:
   ```powershell
   npm run dev
   # or
   npm start
   ```
4. Server runs on `http://localhost:4000` by default. Update `PORT` env to change.

Notes
- This is a development prototype. For production, use a proper database (Postgres, MySQL), stronger secrets, HTTPS, and deployment rules.
- JWT secret can be set with `JWT_SECRET` env var.
- CORS is currently restricted to http://localhost:8080; adjust as needed.
