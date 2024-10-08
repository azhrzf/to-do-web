import { FaEdit } from "react-icons/fa";
import UpdateTodo from "@/components/UpdateTodo";
import DialogWrapper from "@/components/DialogWrapper";
import { Todo } from "@/utils/storage/todos";

const UpdateConfig: React.FC = () => {
  return (
    <div className="button-reset primary-link">
      <FaEdit />
    </div>
  );
};

const UpdateButton: React.FC<Todo> = ({ ...updatedTodo }) => {
  return (
    <DialogWrapper buttonConfig={<UpdateConfig />}>
      <UpdateTodo {...updatedTodo} />
    </DialogWrapper>
  );
};

export default UpdateButton;
