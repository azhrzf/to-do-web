export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export interface CurrentUser {
  userId: string;
}

export interface Label {
  id: string;
  name: string;
}

type TodoItemStatus = "completed" | "inProgress";

export interface TodoItemTypes {
  id: string;
  title: string;
  description: string;
  status: TodoItemStatus;
  dueDate: Date;
  labelId?: string;
  userId: string;
}

