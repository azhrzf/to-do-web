import { type TodoItemTypes } from "./types";

export function getTodosStorage(): TodoItemTypes[] {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  const item = localStorage.getItem("todos");
  return item ? JSON.parse(item) : [];
}

export function addTodoStorage(newTodoItem: TodoItemTypes): TodoItemTypes[] {
  const todos = getTodosStorage();

  localStorage.setItem("notes", JSON.stringify([...todos, newTodoItem]));

  return [...todos, newTodoItem];
}

export function updateTodosStorage(
  updatedTodoId: string,
  updatedTodoItem: TodoItemTypes
): TodoItemTypes[] {
  const todos = getTodosStorage().map((todo: TodoItemTypes) => {
    if (todo.id === updatedTodoId) {
      return updatedTodoItem;
    }
    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(todos));

  return todos;
}
