import { useRef } from "react";

export const AddTodo = ({ onAdd }) => {
  const inputRef = useRef(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onAdd(inputRef.current.value);
        inputRef.current.value = "";
        inputRef.current.focus();
      }}>
      <label>Add Todo</label>
      <div className='input-group'>
        <input type='text' ref={inputRef} />
        <button>Add</button>
      </div>
    </form>
  );
};
