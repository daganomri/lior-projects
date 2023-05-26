import { Todo } from "./Components/Todo";
import { AddTodo } from "./Components/AddTodo";
import { useTodos } from "./Hooks/useTodos";
import { TodosList } from "./Components/TodosList";
import "./App.css";

function App() {
  const { todos, editTodoCompleted, deleteTodo, addTodo } = useTodos();

  return (
    <div className='App'>
      <TodosList>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onCompletedChange={(completed) =>
                editTodoCompleted({ id: todo.id, completed })
              }
              onDelete={() => deleteTodo(todo.id)}
            />
          );
        })}
        <AddTodo onAdd={addTodo} />
      </TodosList>
    </div>
  );
}

export default App;
