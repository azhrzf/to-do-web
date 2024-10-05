import { getUniqueTime } from "../helpers";
import bcrypt from "bcrypt";

export interface UserMetadata {
  name: string;
  email: string;
  passwordHash: string;
}

export interface User extends UserMetadata {
  id: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CurrentUser {
  userId: string;
  name: string;
  email: string;
}

export function getUsersStorage(): User[] {
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  const item = localStorage.getItem("users");
  return item ? JSON.parse(item) : [];
}

export async function addUserStorage(
  newUserMetadata: UserMetadata
): Promise<User[]> {
  const { name, email, passwordHash } = newUserMetadata;
  const users = getUsersStorage();
  const hashed = await bcrypt.hash(passwordHash, 10);

  const newUser = {
    id: `user-${getUniqueTime()}`,
    name,
    email,
    passwordHash: hashed,
  };

  localStorage.setItem("users", JSON.stringify([...users, newUser]));

  return [...users, newUser];
}

export function deleteUserStorage(deletedUserId: string): User[] {
  const users = getUsersStorage().filter(
    (user: User) => user.id !== deletedUserId
  );

  localStorage.setItem("users", JSON.stringify(users));

  return users;
}

export async function loginUserStorage(loginData: LoginData): Promise<User> {
  const { email, password } = loginData;
  const users = getUsersStorage();
  const user = users.find((user: User) => user.email === email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const currentData = {
    userId: user.id,
    name: user.name,
    email: user.email,
  };

  const match = await bcrypt.compare(password, user.passwordHash);
  if (match) {
    if (localStorage.getItem("currentUser") === null) {
      localStorage.setItem("currentUser", JSON.stringify(currentData));
    }
    const item = localStorage.getItem("currentUser");
    return item ? JSON.parse(item) : currentData;
  }

  throw new Error("Invalid email or password");
}

export function logoutUserStorage(): void {
  localStorage.removeItem("currentUser");
}
