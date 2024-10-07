import { convertDueDate } from "@/utils/helpers";

interface DueDateProps {
  isTodoCompleted: boolean;
  todoDueDate?: Date | string;
}

const DueDate: React.FC<DueDateProps> = ({ isTodoCompleted, todoDueDate }) => {
  const { time, isElapsed } = todoDueDate
    ? convertDueDate(new Date(todoDueDate))
    : { time: "", isElapsed: false };

  const dueValidStyle =
    isTodoCompleted || !isElapsed ? "color-primary" : "color-danger";

  const dueInnerText = todoDueDate
    ? `${isElapsed ? "Missed" : "Due"}: ${time}`
    : "No due date";

  const innerText = isTodoCompleted ? "Completed" : dueInnerText;

  return (
    <div className="text-sm font-semibold">
      <p className={dueValidStyle}>{innerText}</p>
    </div>
  );
};

export default DueDate;
