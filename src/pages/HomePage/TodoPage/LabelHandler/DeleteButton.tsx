import { FaTrashAlt } from "react-icons/fa";
import { getLabelNameById } from "@/utils/storage/labels";

interface DeleButtonProps {
  selectedLabel: string;
  handleDeleteLabel: () => void;
}

const DeleteButton: React.FC<DeleButtonProps> = ({
  selectedLabel,
  handleDeleteLabel,
}) => {
  return (
    <div className="input__form_input">
      <p>Delete label?</p>
      <button
        type="button"
        className="basic-flex-middle button-basic danger-link-bg"
        onClick={handleDeleteLabel}
      >
        <FaTrashAlt />
        <p>Delete {getLabelNameById(selectedLabel)}</p>
      </button>
    </div>
  );
};

export default DeleteButton;
