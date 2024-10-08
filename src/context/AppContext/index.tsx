import { createContext, useState, ReactNode } from "react";

import {
  LabelMetadata,
  getLabelsStorage,
  addLabelStorage,
  updateLabelStorage,
} from "@/utils/storage/labels";

import {
  TodoMetadata,
  getTodosStorage,
  addTodoStorage,
  updateTodoStorage,
  deleteTodoStorage,
} from "@/utils/storage/todos";

import {
  RegisterData,
  LoginData,
  getUsersStorage,
  registerUserStorage,
  loginUserStorage,
  getCurrentUserStorage,
  logoutUserStorage,
} from "@/utils/storage/users";

import {
  LabelsContextProps,
  TodosContextProps,
  UsersContextProps,
} from "./types";

export interface AppContextProps {
  labelsContext: LabelsContextProps;
  todosContext: TodosContextProps;
  usersContext: UsersContextProps;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [labels, setLabels] = useState(getLabelsStorage());
  const [todos, setTodos] = useState(getTodosStorage());
  const [users, setUsers] = useState(getUsersStorage());
  const [currentUser, setCurrentUser] = useState(getCurrentUserStorage());

  const addLabel = (newLabelMetadata: LabelMetadata): void => {
    try {
      const newLabels = addLabelStorage(newLabelMetadata);
      if (newLabels) {
        setLabels(newLabels);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const updateLabel = (
    updatedLabelId: string,
    updatedLabelMetadata: LabelMetadata
  ): void => {
    try {
      const newLabels = updateLabelStorage(
        updatedLabelId,
        updatedLabelMetadata
      );
      setLabels(newLabels);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const addTodo = (newTodoMetadata: TodoMetadata): void => {
    try {
      const newTodos = addTodoStorage(newTodoMetadata);
      if (newTodos) {
        setTodos(newTodos);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const updateTodo = (
    updatedTodoId: string,
    updatedTodoMetadata: TodoMetadata
  ): void => {
    try {
      const newTodos = updateTodoStorage(updatedTodoId, updatedTodoMetadata);
      if (newTodos) {
        setTodos(newTodos);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const deleteTodo = (deletedTodoId: string, userId: string): void => {
    try {
      const newTodos = deleteTodoStorage(deletedTodoId, userId);
      if (newTodos) {
        setTodos(newTodos);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const registerUser = (RegisterData: RegisterData): void => {
    try {
      const newUsers = registerUserStorage(RegisterData);
      if (newUsers) {
        setUsers(newUsers);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const loginUser = (loginData: LoginData): void => {
    try {
      const currentUser = loginUserStorage(loginData);
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const logoutUser = (): void => {
    try {
      const logoutItem = logoutUserStorage();
      setCurrentUser(logoutItem);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const labelsContext = {
    labels,
    addLabel,
    updateLabel,
  };

  const todosContext = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  const usersContext = {
    users,
    registerUser,
    loginUser,
    currentUser,
    logoutUser,
  };

  const allContext = {
    labelsContext,
    todosContext,
    usersContext,
  };

  return (
    <AppContext.Provider value={{ ...allContext }}>
      {children}
    </AppContext.Provider>
  );
};
