import { FaTrashAlt } from "react-icons/fa";

interface DeleteButtonProps {
  deleteTodo: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ deleteTodo }) => {
  return (
    <button onClick={deleteTodo} className="button-reset danger-link">
      <FaTrashAlt />
    </button>
  );
};

export default DeleteButton;
