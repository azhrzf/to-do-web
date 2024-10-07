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
}

export function getTodosStorage(): Todo[] {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  const item = localStorage.getItem("todos");
  return item ? JSON.parse(item) : [];
}

function checkTodoIdExist(todos: Todo[], id: string): boolean {
  return todos.some((todo: Todo) => todo.id === id);
}

export function addTodoStorage(newTodoMetadata: TodoMetadata): Todo[] {
  const todos = getTodosStorage();

  const newTodo = {
    ...newTodoMetadata,
    id: `todo-${getUniqueTime()}`,
    title: newTodoMetadata.title.trim(),
    description: newTodoMetadata.description?.trim(),
  };

  localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

  return [...todos, newTodo];
}

export function updateTodoStorage(
  updatedTodoId: string,
  updatedTodoMetadata: TodoMetadata
): Todo[] {
  const todos = getTodosStorage();
  const idExist = checkTodoIdExist(todos, updatedTodoId);

  if (idExist) {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === updatedTodoId) {
        return {
          ...todo,
          ...updatedTodoMetadata,
          title: updatedTodoMetadata.title.trim(),
          description: updatedTodoMetadata.description?.trim(),
        };
      }
      return todo;
    });

    localStorage.setItem("todos", JSON.stringify(newTodos));

    return newTodos;
  }

  throw new Error("Todo not found");
}

export function deleteTodoStorage(deletedTodoId: string): Todo[] {
  const todos = getTodosStorage();
  const idExist = checkTodoIdExist(todos, deletedTodoId);

  if (idExist) {
    const newTodos = todos.filter((todo: Todo) => todo.id !== deletedTodoId);

    localStorage.setItem("todos", JSON.stringify(newTodos));

    return newTodos;
  }

  throw new Error("Todo not found");
}
