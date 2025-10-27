const API_URL = "http://localhost:4000";

// GET all todos
export const getTodos = async () => {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

// GET single todo by id
export const getTodoById = async (id) => {
  const res = await fetch(`${API_URL}/todos/${id}`);
  if (!res.ok) throw new Error("Failed to fetch todo");
  return res.json();
};

// POST create new todo
export const addTodoApi = async (todo) => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
};

// PUT update todo
export const updateTodoApi = async (id, todo) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
};

// DELETE todo
export const deleteTodoApi = async (id) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
};
