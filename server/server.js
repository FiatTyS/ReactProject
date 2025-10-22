const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const DB_PATH = path.join(__dirname, "db.json");
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

// อ่าน db.json
async function readDB() {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

// เขียน db.json (pretty)
async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

// GET /todos
app.get("/todos", async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.todos || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /todos/:id
app.get("/todos/:id", async (req, res) => {
  try {
    const db = await readDB();
    const todo = (db.todos || []).find(t => t.id === Number(req.params.id));
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /todos
app.post("/todos", async (req, res) => {
  try {
    const db = await readDB();
    const todos = db.todos || [];
    const nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const newTodo = { id: nextId, text: req.body.text || "", done: !!req.body.done };
    todos.push(newTodo);
    db.todos = todos;
    await writeDB(db);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /todos/:id
app.put("/todos/:id", async (req, res) => {
  try {
    const db = await readDB();
    const todos = db.todos || [];
    const idx = todos.findIndex(t => t.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    const updated = { ...todos[idx], ...req.body, id: todos[idx].id };
    todos[idx] = updated;
    db.todos = todos;
    await writeDB(db);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  try {
    const db = await readDB();
    const todos = db.todos || [];
    const newTodos = todos.filter(t => t.id !== Number(req.params.id));
    db.todos = newTodos;
    await writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`JSON file API server running on http://localhost:${PORT}`);
});
