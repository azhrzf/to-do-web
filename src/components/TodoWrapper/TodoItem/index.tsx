import ToggleCompleted from "./ToggleCompleted";
import TodoButtons from "./TodoButtons";
import DueDate from "./DueDate";
import { Todo } from "@/utils/storage/todos";
import { getLabelNameById } from "@/utils/storage/labels";
import { useApp } from "@/hooks/useApp";
import clsx from "clsx";

const TodoItem: React.FC<Todo> = ({
  id,
  title,
  description,
  isCompleted,
  dueDate,
  labelId,
}) => {
  const appContext = useApp();
  const { todosContext } = appContext;
  const { todos, updateTodo, deleteTodo } = todosContext;

  const toggleCompleted = (updatedId: string) => {
    const updatedTodo = todos.find((todo) => todo.id === updatedId);

    if (updatedTodo) {
      updateTodo(updatedId, {
        ...updatedTodo,
        isCompleted: !updatedTodo.isCompleted,
      });
    }
  };

  return (
    <article className="todo__wrapper_item">
      <div className="todo__wrapper_item_checkbox">
        <h3 className={clsx("text-xl", isCompleted && "line-through")}>
          {title}
        </h3>
        <ToggleCompleted
          isTodoCompleted={isCompleted}
          toggleCompleted={() => toggleCompleted(id)}
        />
      </div>
      <div className="todo__wrapper_item_metadata">
        <span className="label">{getLabelNameById(labelId)}</span>
        <p className="text-sm color-secondary">{description}</p>
        <DueDate isTodoCompleted={isCompleted} todoDueDate={dueDate} />
      </div>
      <div className="todo__wrapper_item_buttons">
        <TodoButtons deleteTodo={() => deleteTodo(id)} />
      </div>
    </article>
  );
};

export default TodoItem;
