import { FaEdit } from "react-icons/fa";
import UpdateTodo from "@/components/UpdateTodo";
import DialogWrapper from "@/components/DialogWrapper";
import { Todo } from "@/utils/storage/todos";

const EditConfig: React.FC = () => {
  return (
    <div className="button-reset primary-link">
      <FaEdit />
    </div>
  );
};

const EditButton: React.FC<Todo> = ({ ...updatedTodo }) => {
  return (
    <DialogWrapper buttonConfig={<EditConfig />}>
      <UpdateTodo {...updatedTodo} />
    </DialogWrapper>
  );
};

export default EditButton;
