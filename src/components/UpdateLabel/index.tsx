import { useState } from "react";
import { useInput } from "@/hooks/useInput";
import { useApp } from "@/hooks/useApp";
import { getLabelNameById } from "@/utils/storage/labels";
import { FaEdit } from "react-icons/fa";

interface UpdateLabelProps {
  labelId: string;
}

const UpdateLabel: React.FC<UpdateLabelProps> = ({ labelId }) => {
  const appContext = useApp();
  const { labelsContext, usersContext } = appContext;
  const { updateLabel } = labelsContext;
  const { currentUser } = usersContext;

  const { value: newName, handleChange: handleNewNameChange } =
    useInput("New Name");

  const [messageSubmit, setMessageSubmit] = useState({
    appear: false,
    error: false,
    message: "",
  });

  const handleLabelUpdateFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (!currentUser.userId) {
        throw new Error("User not found");
      }

      const labelSubmit = {
        name: newName,
        userId: currentUser.userId,
      };

      updateLabel(labelId, labelSubmit);

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
      <h2>{getLabelNameById(labelId)}</h2>
      {messageSubmit.appear && (
        <p className={messageSubmit.error ? "color-danger" : "color-primary"}>
          {messageSubmit.message}
        </p>
      )}
      <form className="input__form" onSubmit={handleLabelUpdateFormSubmit}>
        <div className="input__form_input">
          <label htmlFor="name">New Label Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newName}
            onChange={handleNewNameChange}
            required
          />
        </div>
        <div className="basic-flex">
          <button
            type="submit"
            className="basic-flex-middle button-basic primary-link-bg"
          >
            <FaEdit />
            <p>Update Label</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLabel;
