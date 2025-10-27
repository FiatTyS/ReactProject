import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import EditTodoPage from "./pages/EditTodoPage";

export default function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Link to="/">
          <h2>Todo App</h2>
        </Link>
        <nav>
          <Link to="/">รายการ</Link>
          <Link to="/edit/new">เพิ่ม</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/edit/:id" element={<EditTodoPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
