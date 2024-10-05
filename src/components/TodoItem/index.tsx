import { type Todo } from "@/utils/storage/todos";
import { convertDueDate } from "@/utils/helpers";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import clsx from "clsx";

export default function TodoItem({
  title,
  description,
  isCompleted,
  dueDate,
}: Todo) {
  const { time, isElapsed } = convertDueDate(dueDate);

  return (
    <article className="todo__wrapper_item">
      <div className="todo__wrapper_item_checkbox">
        <h3 className={clsx("text-xl", isCompleted && "line-through")}>
          {title}
        </h3>
        <div className="checkbox-completed">
          {isCompleted ? <FaCheckCircle /> : <FaRegCircle />}
        </div>
      </div>
      <div className="todo__wrapper_item_metadata">
        <p className="label">Folder</p>
        <p className="text-sm color-secondary">{description}</p>
        <p
          className={clsx(
            "text-sm font-semibold",
            !isCompleted && isElapsed && "color-danger"
          )}
        >
          {isCompleted ? "Completed" : `Due: ${time}`}
        </p>
      </div>
    </article>
  );
}
