export function TodosList({ children }) {
  return (
    <div className='todosList'>
      <h1>React Todo Project</h1>
      <ol>{children}</ol>
    </div>
  );
}
