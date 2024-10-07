import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

interface ToggleCompletedProps {
  isTodoCompleted: boolean;
  toggleCompleted: () => void;
}

const ToggleCompleted: React.FC<ToggleCompletedProps> = ({
  isTodoCompleted,
  toggleCompleted,
}) => {
  return (
    <button
      className="button-reset checkbox-completed primary-link"
      onClick={toggleCompleted}
    >
      {isTodoCompleted ? <FaCheckCircle /> : <FaRegCircle />}
    </button>
  );
};

export default ToggleCompleted;
