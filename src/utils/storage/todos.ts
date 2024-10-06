import { getUniqueTime } from "../helpers";

export interface TodoMetadata {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate?: Date;
  labelId?: string;
  userId: string;
}

export interface Todo extends TodoMetadata {
  id: string;
}

export function getTodosStorage(): Todo[] {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  const item = localStorage.getItem("todos");
  return item ? JSON.parse(item) : [];
}

export function addTodoStorage(newTodoMetadata: TodoMetadata): Todo[] {
  const todos = getTodosStorage();

  const newTodo = {
    id: `todo ${getUniqueTime()}`,
    ...newTodoMetadata,
  };

  localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

  return [...todos, newTodo];
}

export function updateTodoStorage(
  updatedTodoId: string,
  updatedTodoMetadata: TodoMetadata
): Todo[] {
  const todos = getTodosStorage().map((todo: Todo) => {
    if (todo.id === updatedTodoId) {
      return {
        ...todo,
        ...updatedTodoMetadata,
      };
    }
    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(todos));

  return todos;
}

export function deleteTodoStorage(deletedTodoId: string): Todo[] {
  const todos = getTodosStorage().filter(
    (todo: Todo) => todo.id !== deletedTodoId
  );

  localStorage.setItem("todos", JSON.stringify(todos));

  return todos;
}
