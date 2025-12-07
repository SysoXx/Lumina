require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');
const path = require('path');
const http = require('http');
const { Server: IOServer } = require('socket.io');

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { users: [], posts: [] });

async function initDb() {
  await db.read();
  db.data ||= { users: [], posts: [] };
  if (!db.data.users || db.data.users.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(ADMIN_PASSWORD, salt);
    const admin = { id: nanoid(), name: ADMIN_NAME, email: ADMIN_EMAIL, passwordHash: hash, role: 'admin' };
    db.data.users.push(admin);
    console.log('Seeded admin user', ADMIN_EMAIL);
    await db.write();
  }
}

initDb();

const app = express();
app.use(cors({ origin: ["http://localhost:8080", "http://localhost:8081"], credentials: true }));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
  cors: { origin: ["http://localhost:8080", "http://localhost:8081"], methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
  socket.on('create_post', async (data) => {
    try {
      const { title, excerpt, category, authorName } = data || {};
      if (!title) return;
      await db.read();
      const post = {
        id: nanoid(),
        title,
        excerpt: excerpt || '',
        category: category || 'Geral',
        authorId: null,
        authorName: authorName || 'Anon',
        likes: 0,
        comments: 0,
        time: new Date().toISOString(),
      };
      db.data.posts.unshift(post);
      await db.write();
      io.emit('post_created', post);
    } catch (e) {
      console.error('Failed to create post from socket', e);
    }
  });
  socket.on('delete_post', async (data) => {
    try {
      const { id } = data || {};
      if (!id) return;
      await db.read();
      const exists = db.data.posts.find((p) => p.id === id);
      if (!exists) return;
      db.data.posts = db.data.posts.filter((p) => p.id !== id);
      await db.write();
      io.emit('post_deleted', { id });
    } catch (e) {
      console.error('Failed to delete post from socket', e);
    }
  });
});

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    await db.read();
    const user = db.data.users.find((u) => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  await db.read();
  const exists = db.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(409).json({ message: 'Email already registered' });
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = { id: nanoid(), name, email, passwordHash: hash, role: 'user' };
  db.data.users.unshift(user);
  await db.write();
  const token = generateToken(user);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  await db.read();
  const user = db.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
});

app.get('/api/posts', async (req, res) => {
  await db.read();
  res.json(db.data.posts || []);
});

app.post('/api/posts', authMiddleware, async (req, res) => {
  const { title, excerpt, category } = req.body || {};
  if (!title) return res.status(400).json({ message: 'Missing title' });
  await db.read();
  const post = {
    id: nanoid(),
    title,
    excerpt: excerpt || '',
    category: category || 'Geral',
    authorId: req.user.id,
    authorName: req.user.name,
    likes: 0,
    comments: 0,
    time: new Date().toISOString(),
  };
  db.data.posts.unshift(post);
  await db.write();
  try { io.emit('post_created', post); } catch (e) { console.error('Socket emit failed', e); }
  res.json(post);
});

app.delete('/api/posts/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  await db.read();
  const post = db.data.posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.authorId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  db.data.posts = db.data.posts.filter((p) => p.id !== id);
  await db.write();
  try { io.emit('post_deleted', { id }); } catch (e) { console.error('Socket emit failed', e); }
  res.json({ success: true });
});

