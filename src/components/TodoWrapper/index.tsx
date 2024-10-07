import TodoItem from "./TodoItem";
import { useApp } from "@/hooks/useApp";

export default function TodoWrapper() {
  const appContext = useApp();
  const { todosContext } = appContext;
  const { todos } = todosContext;

  const todosInProgres = todos.filter((todo) => !todo.isCompleted);
  const todosCompleted = todos.filter((todo) => todo.isCompleted);

  return (
    <div>
      <div className="todo__wrapper">
        <h2>In Progress</h2>
        <div className="todo__wrapper_grid">
          {todosInProgres.length > 0 ? (
            todosInProgres.map((todo) => <TodoItem key={todo.id} {...todo} />)
          ) : (
            <p className="text-center">No in progress tasks</p>
          )}
        </div>
      </div>
      <div className="todo__wrapper">
        <h2>Completed</h2>
        <div className="todo__wrapper_grid">
          {todosCompleted.length > 0 ? (
            todosCompleted.map((todo) => <TodoItem key={todo.id} {...todo} />)
          ) : (
            <p className="text-center">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}
