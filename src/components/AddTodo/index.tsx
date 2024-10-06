import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { useForm } from "@/hooks/useForm";
import AddLabel from "./AddLabel";

const AddTodo: React.FC = () => {
  const appContext = useApp();
  const { todosContext, labelsContext } = appContext;
  const { addTodo } = todosContext;
  const { labels } = labelsContext;

  const {
    state: todo,
    handleChange: handleTodoChange,
    handleReset: handleTodoReset,
  } = useForm({
    title: "",
    description: "",
    dueDate: "",
  });

  const [selectedLabel, setSelectedLabel] = useState("");

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value);
  };

  const handleTodoFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoSubmit = {
      title: todo.title,
      description: todo.description,
      dueDate: new Date(todo.dueDate),
      labelId: selectedLabel,
      isCompleted: false,
      userId: "user-1",
    };

    const verifyNewTodo = addTodo(todoSubmit);

    if (verifyNewTodo) {
      handleTodoReset();
      setSelectedLabel("");
    }
  };

  return (
    <div>
      <p>Add Todo</p>
      <form onSubmit={handleTodoFormSubmit} className="todo__form">
        <div className="todo__form_first">
          <div className="todo__form_input">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={todo.title}
              onChange={handleTodoChange}
            />
          </div>
          <div className="todo__form_input">
            <label htmlFor="due-date">Due:</label>
            <input
              type="datetime-local"
              id="due-date"
              name="dueDate"
              value={todo.dueDate}
              onChange={handleTodoChange}
            />
          </div>
        </div>
        <div className="todo__form_label">
          <div className="todo__form_input">
            <label htmlFor="pet-select">Choose a pet:</label>
            <select
              name="labelId"
              id="pet-select"
              value={selectedLabel}
              onChange={handleLabelChange}
            >
              <option value="">--No Label--</option>
              {labels.map((label) => {
                return (
                  <option key={label.id} value={label.id}>
                    {label.name}
                  </option>
                );
              })}
            </select>
          </div>
          <AddLabel setSelectedLabel={setSelectedLabel} />
        </div>
        <div className="todo__form_input">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleTodoChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTodo;
