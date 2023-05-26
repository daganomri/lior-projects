import { useEffect, useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch(`http://localhost:3001/todos`);
      const data = await res.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  async function editTodoCompleted({ id, completed }) {
    const res = await fetch(
      `http://localhost:3001/todos/${id}?completed=${completed}`,
      {
        method: "PATCH",
      }
    );
    const updatedTodo = await res.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
      )
    );
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  async function addTodo(title) {
    const res = await fetch(`http://localhost:3001/todos?title=${title}`, {
      method: "POST",
    });
    const newTodo = await res.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  return { todos, editTodoCompleted, deleteTodo, addTodo };
};
