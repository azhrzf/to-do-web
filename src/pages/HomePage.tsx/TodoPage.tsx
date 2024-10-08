import DialogWrapper from "@/components/DialogWrapper";
import AddTodo from "@/components/AddTodo";
import TodoWrapper from "@/components/TodoWrapper";
import { IoMdAddCircle } from "react-icons/io";

const AddConfig: React.FC = () => {
  return (
    <div className="button-basic primary-link-bg basic-flex-middle">
      <IoMdAddCircle />
      <p>Add</p>
    </div>
  );
};

const TodoPage: React.FC = () => {
  return (
    <>
      <DialogWrapper buttonConfig={<AddConfig />}>
        <AddTodo />
      </DialogWrapper>
      <TodoWrapper />
    </>
  );
};

export default TodoPage;
