import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTodo as updateTodoAction } from "../store/todoSlice";
import { getTodoById, updateTodoApi } from "../services/api";
import TodoForm from "../components/TodoForm";

export default function EditTodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const isNew = id === "new";

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }
    async function fetchOne() {
      try {
        const data = await getTodoById(id);
        setTodo(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOne();
  }, [id, isNew]);

  const handleSubmit = async (values) => {
    try {
      if (isNew) {
        // ถ้าต้องการเพิ่มจากหน้านี้ ให้เรียก addTodoApi แล้ว dispatch
        navigate("/");
      } else {
        const res = await updateTodoApi(values.id, values);
        dispatch(updateTodoAction(res));
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>กำลังโหลด...</p>;

  return (
    <div className="container">
      <h1>{isNew ? "เพิ่มงานใหม่" : "แก้ไขงาน"}</h1>
      <button onClick={() => navigate(-1)}>กลับ</button>
      <TodoForm initial={todo} onSubmit={handleSubmit} onCancel={() => navigate("/")} />
    </div>
  );
}
