import { type TodoItemTypes } from "@/utils/types";
import { convertDueDate } from "@/utils/helpers";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function TodoItem({
  title,
  description,
  status,
  dueDate,
}: TodoItemTypes) {
  const { time, isElapsed } = convertDueDate(dueDate);

  return (
    <article className="todo__wrapper_item">
      <div className="todo__wrapper_item_checkbox">
        <h3 className="text-xl line-through">{title}</h3>
        <div className="checkbox-completed">
          {status === "completed" ? <FaCheckCircle /> : <FaRegCircle />}
        </div>
      </div>
      <div className="todo__wrapper_item_metadata">
        <p className="label">Folder</p>
        <p className="text-sm color-secondary">{description}</p>
        <p className="text-sm font-semibold">Due: {time}</p>
      </div>
    </article>
  );
}
