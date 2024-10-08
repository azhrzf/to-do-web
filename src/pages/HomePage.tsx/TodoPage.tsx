import DialogWrapper from "@/components/DialogWrapper";
import AddTodo from "@/components/AddTodo";
import { useState, useEffect } from "react";
import { useApp } from "@/hooks/useApp";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import TodoItem from "@/components/TodoItem";
import { getTodosByUserId } from "@/utils/storage/todos";
import { getLabelNameById } from "@/utils/storage/labels";
import AddLabel from "@/components/AddLabel";
import UpdateLabel from "@/components/UpdateLabel";

const AddConfig: React.FC = () => {
  return (
    <div className="button-basic primary-link-bg basic-flex-middle">
      <IoMdAddCircle />
      <p>Add To do</p>
    </div>
  );
};

const UpdateConfig: React.FC = () => {
  return (
    <div className="button-basic primary-link-bg basic-flex-middle">
      <FaEdit />
      <p>Update Label</p>
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

  const [searchValue, setSearchValue] = useState("");
  const todosInProgres = usedTodos.filter((todo) => !todo.isCompleted);
  const todosCompleted = usedTodos.filter((todo) => todo.isCompleted);

  const handleTodosSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

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
          <div className="input__form_input">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              placeholder="🔍 Search..."
              onChange={handleTodosSearch}
              name="search"
              id="search"
            />
          </div>
          <div className="input__form_input">
            <label htmlFor="label-select">Select label:</label>
            <select
              name="labelId"
              id="label-select"
              value={selectedLabel}
              onChange={handleLabelChange}
            >
              <option value="">- All Labels -</option>
              {verifiedLabels.map((label) => {
                return (
                  <option key={label.id} value={label.id}>
                    {label.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="todo__tools_second">
          <div className="todo__tools_second_label">
            <AddLabel setSelectedLabel={setSelectedLabel} />
          </div>
          {selectedLabel && (
            <div className="input__form_input">
              <p>Update label?</p>
              <DialogWrapper buttonConfig={<UpdateConfig />}>
                <UpdateLabel labelId={selectedLabel} />
              </DialogWrapper>
            </div>
          )}
          {selectedLabel && (
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
