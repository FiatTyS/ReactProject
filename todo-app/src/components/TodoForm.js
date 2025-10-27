import { useState } from "react";
import PropTypes from "prop-types";

function TodoForm({ initial, onSubmit, onCancel }) {
  const [text, setText] = useState(initial?.text || "");
  const [done, setDone] = useState(initial?.done || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const todoData = {
      text: text.trim(),
      done,
      ...(initial?.id && { id: initial.id }),
    };

    onSubmit(todoData);
    setText("");
    setDone(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ใส่ข้อความ..."
        className="input-text"
      />
      <label>
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
        />
        <span>เสร็จแล้ว</span>
      </label>
      <div className="form-actions">
        <button type="submit">บันทึก</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}

TodoForm.propTypes = {
  initial: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    done: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default TodoForm;
