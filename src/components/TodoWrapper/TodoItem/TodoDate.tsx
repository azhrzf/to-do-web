import { convertDueDate } from "@/utils/helpers";

interface DueDateProps {
  isTodoCompleted: boolean;
  todoDueDate?: Date | string;
}

const TodoDate: React.FC<DueDateProps> = ({ isTodoCompleted, todoDueDate }) => {
  const { time, isElapsed } = todoDueDate
    ? convertDueDate(new Date(todoDueDate))
    : { time: "", isElapsed: false };

  const dueValidStyle =
    isTodoCompleted || !isElapsed ? "color-primary" : "color-danger";

  const endTime = (time: string): boolean => {
    return time === "0 seconds";
  };

  const dueInnerText = todoDueDate && !endTime(time)
    ? `${isElapsed ? "Missed" : "Due"}: ${time}`
    : "No due date";

  const innerText = isTodoCompleted ? "Completed" : dueInnerText;

  return (
    <div className="text-sm font-semibold">
      <p className={dueValidStyle}>{innerText}</p>
    </div>
  );
};

export default TodoDate;
