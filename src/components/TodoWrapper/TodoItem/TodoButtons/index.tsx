import DeleteButton from "./DeleteButton";

interface TodoButtonsProps {
  deleteTodo: () => boolean;
}

const TodoButtons: React.FC<TodoButtonsProps> = ({ deleteTodo }) => {
  return (
    <>
      <DeleteButton deleteTodo={deleteTodo} />
    </>
  );
};

export default TodoButtons;
