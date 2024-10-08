import { getUsersStorage } from "./users";
import { Todo, getTodosStorage, updateTodoStorage } from "./todos";
import { getUniqueTime } from "../helpers";

export interface LabelMetadata {
  name: string;
  userId: string;
}

export interface Label extends LabelMetadata {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export function getLabelsStorage(): Label[] {
  try {
    if (localStorage.getItem("labels") === null) {
      localStorage.setItem("labels", JSON.stringify([]));
    }

    const item = localStorage.getItem("labels");

    return item ? JSON.parse(item) : [];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function addLabelStorage(newLabelMetadata: LabelMetadata): Label[] {
  try {
    const { userId, name } = newLabelMetadata;

    if (!getUsersStorage().some((user) => user.id === userId)) {
      throw new Error("User not found");
    }

    const labels = getLabelsStorage();

    const newLabel = {
      id: `label-${getUniqueTime()}`,
      name: name.trim(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    localStorage.setItem("labels", JSON.stringify([...labels, newLabel]));

    return [...labels, newLabel];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function updateLabelStorage(
  updatedLabelId: string,
  newLabelMetadata: LabelMetadata
): Label[] {
  try {
    const labels = getLabelsStorage().map((label: Label) => {
      if (label.id === updatedLabelId) {
        if (label.userId !== newLabelMetadata.userId) {
          throw new Error("You are not authorized to update this label");
        }

        return {
          ...label,
          name: newLabelMetadata.name.trim(),
          updatedAt: new Date(),
        };
      }
      return label;
    });

    localStorage.setItem("labels", JSON.stringify(labels));

    return labels;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function deleteLabelStorage(
  deletedLabelId: string,
  userId: string
): {
  labels: Label[];
  todos: Todo[];
} {
  try {
    const labels = getLabelsStorage();
    const deletedLabel = labels.find(
      (label: Label) => label.id === deletedLabelId
    );

    if (!deletedLabel) {
      throw new Error("Label not found");
    }

    if (deletedLabel.userId !== userId) {
      throw new Error("You are not authorized to delete this label");
    }

    const newLabels = labels.filter(
      (label: Label) => label.id !== deletedLabelId
    );

    localStorage.setItem("labels", JSON.stringify(newLabels));
    getTodosStorage().forEach((todo: Todo) => {
      if (todo.labelId === deletedLabelId) {
        updateTodoStorage(todo.id, {
          ...todo,
          labelId: "no-label",
        });
      }
    });

    return { labels: newLabels, todos: getTodosStorage() };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function getLabelNameById(labelId: string = ""): string {
  if (labelId === "") return "No Label";

  const labels = getLabelsStorage();
  const label = labels.find((label: Label) => label.id === labelId);
  return label ? label.name : "No Label";
}
