import { createContext, useState, ReactNode } from "react";
import {
  type LabelMetadata,
  type LabelsContextProps,
  getLabelsStorage,
  addLabelStorage,
  updateLabelStorage,
} from "@/utils/storage/labels";
import {
  type TodoMetadata,
  type TodosContextProps,
  getTodosStorage,
  addTodoStorage,
  updateTodoStorage,
} from "@/utils/storage/todos";

interface AppContextProps {
  todosContext: TodosContextProps;
  labelsContext: LabelsContextProps;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState(getTodosStorage());
  const [labels, setLabels] = useState(getLabelsStorage());

  function addTodo(newTodoMetadata: TodoMetadata) {
    const newTodos = addTodoStorage(newTodoMetadata);
    setTodos(newTodos);
  }

  function updateTodo(
    updatedTodoId: string,
    updatedTodoMetadata: TodoMetadata
  ) {
    const newTodos = updateTodoStorage(updatedTodoId, updatedTodoMetadata);
    setTodos(newTodos);
  }

  function addLabel(newLabelMetadata: LabelMetadata) {
    const newLabels = addLabelStorage(newLabelMetadata);
    setLabels(newLabels);
  }

  function updateLabel(
    updatedLabelId: string,
    updatedLabelMetadata: LabelMetadata
  ) {
    const newLabels = updateLabelStorage(updatedLabelId, updatedLabelMetadata);
    setLabels(newLabels);
  }

  const todosContext = {
    todos,
    addTodo,
    updateTodo,
  };

  const labelsContext = {
    labels,
    addLabel,
    updateLabel,
  };

  const allContext = {
    todosContext,
    labelsContext,
  };

  return (
    <AppContext.Provider value={{ ...allContext }}>
      {children}
    </AppContext.Provider>
  );
};
