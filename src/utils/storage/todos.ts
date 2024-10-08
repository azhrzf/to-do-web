import { getUsersStorage } from "./users";
import { getUniqueTime } from "../helpers";

export interface TodoMetadata {
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: Date | string;
  labelId?: string;
  userId: string;
}

export interface Todo extends TodoMetadata {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export function getTodosStorage(): Todo[] {
  try {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    const item = localStorage.getItem("todos");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function addTodoStorage(newTodoMetadata: TodoMetadata): Todo[] {
  try {
    if (!getUsersStorage().some((user) => user.id === newTodoMetadata.userId)) {
      throw new Error("User not found");
    }

    const todos = getTodosStorage();

    const newTodo = {
      ...newTodoMetadata,
      id: `todo-${getUniqueTime()}`,
      title: newTodoMetadata.title.trim(),
      description: newTodoMetadata.description?.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

    return [...todos, newTodo];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function updateTodoStorage(
  updatedTodoId: string,
  updatedTodoMetadata: TodoMetadata
): Todo[] {
  try {
    const todos = getTodosStorage();
    const idExist = todos.some((todo: Todo) => todo.id === updatedTodoId);

    if (idExist) {
      const newTodos = todos.map((todo: Todo) => {
        if (todo.id === updatedTodoId) {
          if (todo.userId !== updatedTodoMetadata.userId) {
            throw new Error("Not authorized to update");
          }

          return {
            ...todo,
            ...updatedTodoMetadata,
            title: updatedTodoMetadata.title.trim(),
            description: updatedTodoMetadata.description?.trim(),
            updatedAt: new Date(),
          };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    }

    throw new Error("Todo not found");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function deleteTodoStorage(
  deletedTodoId: string,
  userId: string
): Todo[] {
  try {
    const todos = getTodosStorage();
    const deletedTodo = todos.find((todo: Todo) => todo.id === deletedTodoId);

    if (!deletedTodo) {
      throw new Error("Todo not found");
    }

    if (deletedTodo.userId !== userId) {
      throw new Error("You are not authorized to delete this label");
    }

    const newTodos = todos.filter((todo: Todo) => todo.id !== deletedTodoId);

    localStorage.setItem("todos", JSON.stringify(newTodos));

    return newTodos;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
