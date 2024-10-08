import DialogWrapper from "@/components/DialogWrapper";
import AddTodo from "@/components/AddTodo";
import { useState, useEffect } from "react";
import { useApp } from "@/hooks/useApp";
import { IoMdAddCircle } from "react-icons/io";
import { getTodosByUserId } from "@/utils/storage/todos";
import { getLabelNameById } from "@/utils/storage/labels";
import AddLabel from "@/components/AddLabel";
import { useInput } from "@/hooks/useInput";
import SearchTodo from "./SearchTodo";
import TodoItem from "@/components/TodoItem";
import SelectLabel from "./LabelHandler/SelectLabel";
import UpdateButton from "./LabelHandler/UpdateButton";
import DeleteButton from "./LabelHandler/DeleteButton";

const AddConfig: React.FC = () => {
  return (
    <div className="button-basic primary-link-bg basic-flex-middle">
      <IoMdAddCircle />
      <p>Add To do</p>
    </div>
  );
};

const TodoPage: React.FC = () => {
  const appContext = useApp();
  const { labelsContext, todosContext, usersContext } = appContext;
  const { labels, deleteLabel } = labelsContext;
  const { todos } = todosContext;
  const { currentUser } = usersContext;

  const labelName = (labelId: string) => {
    const castLabelName = getLabelNameById(labelId);
    if (castLabelName === "No Label") {
      return "All";
    }

    return castLabelName;
  };

  const [selectedLabel, setSelectedLabel] = useState("");
  const verifiedLabels = labels.filter(
    (label) => label.userId === currentUser.userId
  );

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value);
  };

  const [usedTodos, setUsedTodos] = useState(
    getTodosByUserId(todos, currentUser.userId)
  );

  const todosInProgres = usedTodos.filter((todo) => !todo.isCompleted);
  const todosCompleted = usedTodos.filter((todo) => todo.isCompleted);

  const { value: searchValue, handleChange: handleTodosSearch } = useInput("");

  const handleDeleteLabel = () => {
    if (currentUser.userId) {
      deleteLabel(selectedLabel, currentUser.userId);
      setSelectedLabel("");
    }
  };

  useEffect(() => {
    setUsedTodos(
      getTodosByUserId(todos, currentUser.userId).filter((todo) => {
        const labelMatcher = selectedLabel
          ? todo.labelId === selectedLabel
          : true;
        const description = todo.description ? todo.description : "";
        const searchMatcher = `${todo.title.toLowerCase()} ${description.toLowerCase()}`;
        const matcher =
          searchMatcher.includes(searchValue.toLowerCase()) && labelMatcher;

        return matcher;
      })
    );
  }, [todos, currentUser, searchValue, selectedLabel]);

  return (
    <>
      <h2 className="todo__welcome">Welcome, {currentUser.name}</h2>
      <div className="basic-space-y">
        <div className="todo__tools">
          <SearchTodo
            searchValue={searchValue}
            handleTodosSearch={handleTodosSearch}
          />
          <SelectLabel
            selectedLabel={selectedLabel}
            handleLabelChange={handleLabelChange}
            verifiedLabels={verifiedLabels}
          />
        </div>
        <div className="todo__tools_second">
          <div className="todo__tools_second_label">
            <AddLabel setSelectedLabel={setSelectedLabel} />
          </div>
          {selectedLabel && <UpdateButton selectedLabel={selectedLabel} />}
          {selectedLabel && (
            <DeleteButton
              selectedLabel={selectedLabel}
              handleDeleteLabel={handleDeleteLabel}
            />
          )}
        </div>
        <div className="todo__tools_second">
          <div className="input__form_input">
            <p>Create a new To Do?</p>
            <DialogWrapper buttonConfig={<AddConfig />}>
              <AddTodo />
            </DialogWrapper>
          </div>
        </div>
      </div>
      <div>
        <div className="todo__wrapper">
          <h2>{labelName(selectedLabel)} In Progress</h2>
          <div className="todo__wrapper_grid">
            {todosInProgres.length > 0 ? (
              todosInProgres.map((todo) => <TodoItem key={todo.id} {...todo} />)
            ) : (
              <p className="text-center">No in progress tasks</p>
            )}
          </div>
        </div>
        <div className="todo__wrapper">
          <h2>{labelName(selectedLabel)} Completed</h2>
          <div className="todo__wrapper_grid">
            {todosCompleted.length > 0 ? (
              todosCompleted.map((todo) => <TodoItem key={todo.id} {...todo} />)
            ) : (
              <p className="text-center">No completed tasks</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
