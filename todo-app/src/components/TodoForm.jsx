import PropTypes from "prop-types";
import { useState } from "react";

export default function TodoForm({ onSubmit, initialValue }) {
  const [text, setText] = useState(initialValue?.text || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text, done: initialValue?.done || false });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        placeholder="พิมพ์งานที่ต้องทำ..."
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">{initialValue ? "บันทึก" : "เพิ่ม"}</button>
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValue: PropTypes.object,
};
