import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { useInput } from "@/hooks/useInput";

const AddLabel: React.FC<{ setSelectedLabel: (label: string) => void }> = ({
  setSelectedLabel,
}) => {
  const appContext = useApp();
  const { labelsContext } = appContext;
  const { addLabel } = labelsContext;

  const [showAddLabel, setShowAddLabel] = useState(false);

  const { value: newLabel, handleChange: handleNewLabelChange } =
    useInput("New Label");

  const handleAddLabel = () => {
    const verifyNewLabel = addLabel({ name: newLabel });
    if (verifyNewLabel) {
      setShowAddLabel(false);
      setSelectedLabel(verifyNewLabel.id);
    }
  };

  return (
    <div>
      {showAddLabel && (
        <div className="todo__form_input">
          <label htmlFor="newLabel">New Label:</label>
          <input
            type="text"
            id="newLabel"
            name="label"
            value={newLabel}
            onChange={handleNewLabelChange}
          />
        </div>
      )}
      <div className="todo__form_input">
        <p>Can't find your label?</p>
        <button
          type="button"
          onClick={() => setShowAddLabel((prevState) => !prevState)}
        >
          {showAddLabel ? "X" : "Add New Label"}
        </button>
      </div>
      {showAddLabel && (
        <button type="button" onClick={handleAddLabel}>
          Save Label
        </button>
      )}
    </div>
  );
};

export default AddLabel;
