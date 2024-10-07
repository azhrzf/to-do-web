import TodoToggle from "./TodoToggle";
import DeleteButton from "./TodoButtons/DeleteButton";
import UpdateButton from "./TodoButtons/UpdateButton";
import TodoDate from "./TodoDate";
import { Todo } from "@/utils/storage/todos";
import { getLabelNameById } from "@/utils/storage/labels";
import { useApp } from "@/hooks/useApp";
import clsx from "clsx";

const TodoItem: React.FC<Todo> = (todoProps) => {
  const { id, title, description, dueDate, labelId, isCompleted } = todoProps;

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
        <TodoToggle
          isTodoCompleted={isCompleted}
          toggleCompleted={() => toggleCompleted(id)}
        />
      </div>
      <div className="todo__wrapper_item_metadata">
        <span className="label">{getLabelNameById(labelId)}</span>
        <p className="text-sm color-secondary">{description}</p>
        <TodoDate isTodoCompleted={isCompleted} todoDueDate={dueDate} />
      </div>
      <div className="todo__wrapper_item_buttons basic-flex">
        <UpdateButton {...todoProps} />
        <DeleteButton deleteTodo={() => deleteTodo(id)} />
      </div>
    </article>
  );
};

export default TodoItem;
