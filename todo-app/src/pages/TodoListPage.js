import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import {
  setLoading,
  setError,
  setTodos,
  deleteTodo as deleteTodoAction,
  updateTodo as updateTodoAction,
  addTodo as addTodoAction,
} from "../store/todoSlice";
import { getTodos, deleteTodoApi, updateTodoApi, addTodoApi } from "../services/api";

import TodoForm from "../components/TodoForm";

export default function TodoListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    async function fetchData() {
      dispatch(setLoading(true));
      try {
        const data = await getTodos();
        dispatch(setTodos(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteTodoApi(id);
      dispatch(deleteTodoAction(id));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const handleToggle = async (todo) => {
    try {
      const updated = { ...todo, done: !todo.done };
      const res = await updateTodoApi(todo.id, updated);
      dispatch(updateTodoAction(res));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const handleAdd = async (todo) => {
    try {
      const res = await addTodoApi(todo);
      dispatch(addTodoAction(res));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return (
    <div className="container">
      <h1>📋 รายการงาน</h1>
      <Link to="/edit/new" className="link-add">
        ➕ เพิ่มงาน (หน้าแยก)
      </Link>

      <h2>เพิ่มเร็ว ๆ</h2>
      <TodoForm onSubmit={handleAdd} />

      {loading && <p>กำลังโหลด...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="list">
        {items.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onEdit={() => navigate(`/edit/${t.id}`)}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
