import { useState } from "react";

export function Todo({ id, title, completed, onCompletedChange, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      onDelete();
    }, 500);
  };

  return (
    <li className={`todo ${isDeleting && "deleting"}`}>
      <input
        type='checkbox'
        checked={completed}
        onChange={(event) => onCompletedChange(event.target.checked)}
      />
      <span className={`todoBody ${completed ? "completed" : ""}`}>
        {title} <button onClick={handleDelete}>Delete</button>
      </span>
    </li>
  );
}
