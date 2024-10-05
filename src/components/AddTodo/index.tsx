import React, { useState } from "react";
import { useInput } from "@/hooks/useInput";

export default function AddTodo() {
  const { state, handleChange } = useInput({
    title: "",
    description: "",
    dueDate: "",
    label: "",
  });

  const [isAddingNewLabel, setIsAddingNewLabel] = useState(false);

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "addNew") {
      setIsAddingNewLabel(true);
    } else {
      setIsAddingNewLabel(false);
      handleChange(event as any); // Type assertion to match handleChange signature
    }
  };

  return (
    <div>
      <p>Add Todo</p>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={state.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <label htmlFor="due-date">Due:</label>
        <input
          type="datetime-local"
          id="due-date"
          name="dueDate"
          value={state.dueDate}
          onChange={handleChange}
        />
        <label htmlFor="label">Label:</label>
        <select
          id="label"
          name="label"
          value={state.label}
          onChange={handleLabelChange}
        >
          <option value="">Select a label</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="addNew">Add new label</option>
        </select>
        {isAddingNewLabel && (
          <input
            type="text"
            id="new-label"
            name="label"
            placeholder="New label"
            value={state.label}
            onChange={handleChange}
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
