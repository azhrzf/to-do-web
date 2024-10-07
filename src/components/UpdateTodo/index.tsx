import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { useForm } from "@/hooks/useForm";
import { sliceDate } from "@/utils/helpers";
import { Todo } from "@/utils/storage/todos";
import AddLabel from "../AddLabel";

const UpdateTodo: React.FC<Todo> = (updatedTodoProps) => {
  const appContext = useApp();
  const { todosContext, labelsContext } = appContext;
  const { updateTodo } = todosContext;
  const { labels } = labelsContext;

  const { state: todo, handleChange: handleTodoChange } = useForm({
    title: updatedTodoProps.title,
    description: updatedTodoProps.description ?? "",
    dueDate: updatedTodoProps.dueDate
      ? sliceDate(updatedTodoProps.dueDate.toString())
      : "",
  });

  const [selectedLabel, setSelectedLabel] = useState(updatedTodoProps.labelId);

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value);
  };

  const [isCompleted, setIsCompleted] = useState(updatedTodoProps.isCompleted);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked);
  };

  const [massageSubmit, setMassageSubmit] = useState({
    appear: false,
    error: false,
    message: "",
  });

  const handleTodoFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoSubmit = {
      title: todo.title,
      description: todo.description,
      dueDate: new Date(todo.dueDate),
      labelId: selectedLabel,
      isCompleted,
      userId: "user-1",
    };

    const verifyNewTodo = updateTodo(updatedTodoProps.id, todoSubmit);

    if (verifyNewTodo) {
      setMassageSubmit({
        appear: true,
        error: false,
        message: "Todo added successfully!",
      });
    } else {
      setMassageSubmit({
        appear: true,
        error: true,
        message: "Error adding todo. Please try again.",
      });
    }
  };

  return (
    <div className="basic-space-y">
      <h2>Add Todo</h2>
      {massageSubmit.appear && (
        <p className={massageSubmit.error ? "color-danger" : "color-primary"}>
          {massageSubmit.message}
        </p>
      )}
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
              required
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
        <div className="basic-flex">
          <label htmlFor="isCompleted">Completed:</label>
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
        </div>
        <button type="submit" className="button-basic primary-link-bg">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
