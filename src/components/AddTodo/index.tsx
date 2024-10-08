import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { useForm } from "@/hooks/useForm";
import AddLabel from "../AddLabel";

const AddTodo: React.FC = () => {
  const appContext = useApp();
  const { todosContext, labelsContext, usersContext } = appContext;
  const { addTodo } = todosContext;
  const { labels } = labelsContext;
  const { currentUser } = usersContext;

  const {
    state: todo,
    handleChange: handleTodoChange,
    handleReset: handleTodoReset,
  } = useForm({
    title: "",
    description: "",
    dueDate: "",
  });

  const verifiedLabels = labels.filter((label) => label.userId === currentUser.userId);

  const [selectedLabel, setSelectedLabel] = useState("");

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value);
  };

  const [messageSubmit, setMessageSubmit] = useState({
    appear: false,
    error: false,
    message: "",
  });

  const handleTodoFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!currentUser.userId) {
        throw new Error("User not found");
      }

      const todoSubmit = {
        title: todo.title,
        description: todo.description,
        dueDate: new Date(todo.dueDate),
        labelId: selectedLabel,
        isCompleted: false,
        userId: currentUser.userId,
      };


      addTodo(todoSubmit);

      handleTodoReset();
      setSelectedLabel("");
      setMessageSubmit({
        appear: true,
        error: false,
        message: "Todo added successfully!",
      });
    } catch (error) {
      setMessageSubmit({
        appear: true,
        error: true,
        message: `Error adding todo: ${(error as Error).message}`,
      });
    }
  };

  return (
    <div className="basic-space-y">
      <h2>Add Todo</h2>
      {messageSubmit.appear && (
        <p className={messageSubmit.error ? "color-danger" : "color-primary"}>
          {messageSubmit.message}
        </p>
      )}
      <form onSubmit={handleTodoFormSubmit} className="input__form">
        <div className="input__form_first">
          <div className="input__form_input">
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
          <div className="input__form_input">
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
        <div className="input__form_label">
          <div className="input__form_input">
            <label htmlFor="label-select">Choose a label:</label>
            <select
              name="labelId"
              id="label-select"
              value={selectedLabel}
              onChange={handleLabelChange}
            >
              <option value="">--No Label--</option>
              {verifiedLabels.map((label) => {
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
        <div className="input__form_input">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleTodoChange}
          />
        </div>
        <button type="submit" className="button-basic primary-link-bg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
