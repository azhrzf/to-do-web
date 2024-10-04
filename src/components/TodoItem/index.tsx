import {
  FaCheckCircle,
  // FaRegCircle
} from "react-icons/fa";

export default function TodoItem() {
  return (
    <article className="todo__wrapper_item">
      <div className="todo__wrapper_item_checkbox">
        <h3 className="text-xl line-through">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <div className="checkbox-completed">
          <FaCheckCircle />
        </div>
      </div>
      <div className="todo__wrapper_item_metadata">
        <p className="text-sm color-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
          maiores natus eius suscipit vel dicta necessitatibus... see more
        </p>
        <p className="text-sm">Due: Wednesday, 17 September 2024</p>
      </div>
    </article>
  );
}
