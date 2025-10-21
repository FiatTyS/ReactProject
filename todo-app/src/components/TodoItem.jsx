import PropTypes from "prop-types";

export default function TodoItem({ todo, onEdit, onDelete }) {
  return (
    <div className="todo-item" style={{ marginBottom: "10px" }}>
      <input type="checkbox" checked={todo.done} readOnly />
      <span style={{ margin: "0 10px" }}>{todo.text}</span>
      <button onClick={() => onEdit(todo)}>✏️</button>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
