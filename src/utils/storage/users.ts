import { getUniqueTime } from "../helpers";
import { Label, getLabelsStorage, deleteLabelStorage } from "./labels";
import { Todo, getTodosStorage, deleteTodoStorage } from "./todos";
import bcrypt from "bcryptjs";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CurrentUser {
  loggedIn: boolean;
  userId?: string;
  name?: string;
  email?: string;
}

function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function getUsersStorage(): User[] {
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  const item = localStorage.getItem("users");
  return item ? JSON.parse(item) : [];
}

function verifyEmailStorage(email: string, users: User[]): void {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    if (users.some((user: User) => user.email === email)) {
      throw new Error("Email already exists");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function registerUserStorage(newUserMetadata: RegisterData): User[] {
  try {
    const { name, email, password, confirmPassword } = newUserMetadata;

    if (password !== confirmPassword) {
      throw new Error("Password does not match");
    }

    const users = getUsersStorage();

    verifyEmailStorage(email, users);

    const hashed = hashPassword(password);

    const newUser = {
      id: `user-${getUniqueTime()}`,
      name,
      email,
      passwordHash: hashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    return [...users, newUser];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function deleteUserStorage(deletedUserId: string): {
  users: User[];
  todos: Todo[];
  labels: Label[];
} {
  try {
    const users = getUsersStorage();

    if (!users.some((user: User) => user.id === deletedUserId)) {
      throw new Error("User not found");
    }

    const currentUser = getCurrentUserStorage();

    if (
      !currentUser ||
      !currentUser.loggedIn ||
      currentUser.userId !== deletedUserId
    ) {
      throw new Error("Not authorized to delete user");
    }

    const newUsers = users.filter((user: User) => user.id !== deletedUserId);

    getTodosStorage().forEach((todo: Todo) => {
      if (todo.userId === deletedUserId) {
        deleteTodoStorage(todo.id, deletedUserId);
      }
    });

    getLabelsStorage().forEach((label: Label) => {
      if (label.userId === deletedUserId) {
        deleteLabelStorage(label.id, deletedUserId);
      }
    });

    localStorage.setItem("users", JSON.stringify(users));

    return {
      users: newUsers,
      todos: getTodosStorage(),
      labels: getLabelsStorage(),
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function loginUserStorage(loginData: LoginData): CurrentUser {
  try {
    const { email, password } = loginData;

    const users = getUsersStorage();
    const user = users.find((user: User) => user.email === email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const match = comparePassword(password, user.passwordHash);
    if (match) {
      const currentData = {
        loggedIn: true,
        userId: user.id,
        name: user.name,
        email: user.email,
      };

      localStorage.setItem("currentUser", JSON.stringify(currentData));
      return currentData;
    }

    throw new Error("Invalid email or password");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function logoutUserStorage(): CurrentUser {
  const logoutItem = {
    loggedIn: false,
  };
  localStorage.setItem("currentUser", JSON.stringify(logoutItem));

  return logoutItem;
}

export function checkLoginStorage(): CurrentUser {
  const item = localStorage.getItem("currentUser");

  if (item) {
    const verifyUsers = getUsersStorage().find(
      (user: User) => user.id === JSON.parse(item).userId
    );

    if (verifyUsers) {
      return {
        loggedIn: true,
        userId: verifyUsers.id,
        name: verifyUsers.name,
        email: verifyUsers.email,
      };
    }
  }

  throw new Error("User not found");
}

export function getCurrentUserStorage(): CurrentUser {
  const item = localStorage.getItem("currentUser");

  if (!item) {
    localStorage.setItem("currentUser", JSON.stringify({ loggedIn: false }));
    return { loggedIn: false };
  } else {
    return JSON.parse(item);
  }
}
