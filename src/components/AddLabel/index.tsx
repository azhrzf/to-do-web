import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { useInput } from "@/hooks/useInput";
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
import clsx from "clsx";

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
    <div className={clsx(showAddLabel && "todo__form_label_inner")}>
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
        {!showAddLabel && <p>Can't find your label?</p>}
        <button
          type="button"
          className={clsx(
            "button-basic max-w-full",
            showAddLabel ? "danger-link-bg " : "primary-link-bg"
          )}
          onClick={() => setShowAddLabel((prevState) => !prevState)}
        >
          <div className="basic-flex-middle">
            {showAddLabel ? (
              <>
                <IoMdCloseCircle />
                <p>Cancel</p>
              </>
            ) : (
              <>
                <IoMdAddCircle />
                <p>Add Label</p>
              </>
            )}
          </div>
        </button>
      </div>
      {showAddLabel && (
        <button
          type="button"
          className="button-basic primary-link-bg max-w-full"
          onClick={handleAddLabel}
        >
          <div className="basic-flex-middle">
            <IoMdAddCircle />
            <p>Add</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default AddLabel;
