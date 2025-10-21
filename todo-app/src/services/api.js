const API_URL = "http://localhost:3000/todos";

export const getTodos = async () => (await fetch(API_URL)).json();

export const addTodo = async (todo) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

export const updateTodo = async (id, todo) =>
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

export const deleteTodo = async (id) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" });
