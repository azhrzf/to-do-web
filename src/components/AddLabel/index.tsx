import { useState, useEffect } from "react";
import { useApp } from "@/hooks/useApp";
import { useInput } from "@/hooks/useInput";
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
import clsx from "clsx";

interface AddLabelProps {
  setSelectedLabel: (label: string) => void;
}

const AddLabel: React.FC<AddLabelProps> = ({ setSelectedLabel }) => {
  const appContext = useApp();
  const { labelsContext, usersContext } = appContext;
  const { labels, addLabel } = labelsContext;
  const { currentUser } = usersContext;

  const [showAddLabel, setShowAddLabel] = useState(false);

  const { value: newLabel, handleChange: handleNewLabelChange } =
    useInput("New Label");

  const [messageSubmit, setMessageSubmit] = useState({
    appear: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    if (labels.length > 0) {
      setSelectedLabel(labels[labels.length - 1].id);
    }
  }, [labels, setSelectedLabel]);

  const handleAddLabel = () => {
    try {
      if (!currentUser.userId) {
        throw new Error("User not found");
      }
      
      addLabel({ userId: currentUser.userId, name: newLabel });
      setShowAddLabel(false);
    } catch (error) {
      setMessageSubmit({
        appear: true,
        error: true,
        message: (error as Error).message,
      });
    }
  };

  return (
    <div className={clsx(showAddLabel && "input__form_label_inner")}>
      {showAddLabel && (
        <div className="input__form_input">
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
      <div className="input__form_input">
        {messageSubmit.appear && (
          <p className={messageSubmit.error ? "color-danger" : "color-primary"}>
            {messageSubmit.message}
          </p>
        )}
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
