import { createContext, useState, ReactNode } from "react";
import {
  Label,
  LabelMetadata,
  getLabelsStorage,
  addLabelStorage,
  updateLabelStorage,
} from "@/utils/storage/labels";
import { LabelsContextProps } from "./types";
import {
  Todo,
  TodoMetadata,
  getTodosStorage,
  addTodoStorage,
  updateTodoStorage,
} from "@/utils/storage/todos";
import { TodosContextProps } from "./types";

export interface AppContextProps {
  todosContext: TodosContextProps;
  labelsContext: LabelsContextProps;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [labels, setLabels] = useState(getLabelsStorage());
  const [todos, setTodos] = useState(getTodosStorage());

  function addLabel(newLabelMetadata: LabelMetadata): Label {
    const newLabels = addLabelStorage(newLabelMetadata);
    if (newLabels) {
      setLabels(newLabels);
      return newLabels[newLabels.length - 1];
    }

    throw new Error("Failed to add label");
  }

  function updateLabel(
    updatedLabelId: string,
    updatedLabelMetadata: LabelMetadata
  ) {
    const newLabels = updateLabelStorage(updatedLabelId, updatedLabelMetadata);
    setLabels(newLabels);
  }

  function addTodo(newTodoMetadata: TodoMetadata): Todo {
    const newTodos = addTodoStorage(newTodoMetadata);
    if (newTodos) {
      setTodos(newTodos);
      return newTodos[newTodos.length - 1];
    }

    throw new Error("Failed to add todo");
  }

  function updateTodo(
    updatedTodoId: string,
    updatedTodoMetadata: TodoMetadata
  ) {
    const newTodos = updateTodoStorage(updatedTodoId, updatedTodoMetadata);
    setTodos(newTodos);
  }

  const labelsContext = {
    labels,
    addLabel,
    updateLabel,
  };

  const todosContext = {
    todos,
    addTodo,
    updateTodo,
  };

  const allContext = {
    labelsContext,
    todosContext,
  };

  return (
    <AppContext.Provider value={{ ...allContext }}>
      {children}
    </AppContext.Provider>
  );
};
