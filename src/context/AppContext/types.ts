import { Label, LabelMetadata } from "@/utils/storage/labels";
import { Todo, TodoMetadata } from "@/utils/storage/todos";
import { RegisterData, LoginData, CurrentUser } from "@/utils/storage/users";

export interface LabelsContextProps {
  labels: Label[];
  addLabel: (newLabelMetadata: LabelMetadata) => void;
  updateLabel: (
    updatedLabelId: string,
    updatedLabelMetadata: LabelMetadata
  ) => void;
}

export interface TodosContextProps {
  todos: Todo[];
  addTodo: (newTodoMetadata: TodoMetadata) => void;
  updateTodo: (
    updatedTodoId: string,
    updatedTodoMetadata: TodoMetadata
  ) => void;
  deleteTodo: (deletedTodoId: string, userId: string) => void;
}

export interface UsersContextProps {
  registerUser: (RegisterData: RegisterData) => void;
  loginUser: (loginData: LoginData) => void;
  currentUser: CurrentUser;
  logoutUser: () => void;
}
