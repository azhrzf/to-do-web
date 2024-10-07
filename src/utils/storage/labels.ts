import { getUniqueTime } from "../helpers";

export interface LabelMetadata {
  name: string;
}

export interface Label extends LabelMetadata {
  id: string;
}

export function getLabelsStorage(): Label[] {
  const dateNow = new Date();

  const newLabel = {
    id: `no-label-${dateNow.getTime()}`,
    name: "No Label",
  };

  if (localStorage.getItem("labels") === null) {
    localStorage.setItem("labels", JSON.stringify([newLabel]));
  }

  const item = localStorage.getItem("labels");

  const isLabelsArray = item && Array.isArray(JSON.parse(item));
  const isLabelsEmpty = isLabelsArray && JSON.parse(item).length === 0;

  if (isLabelsEmpty) {
    localStorage.setItem("labels", JSON.stringify([newLabel]));
  }
  return item ? JSON.parse(item) : [newLabel];
}

export function addLabelStorage(newLabelMetadata: LabelMetadata): Label[] {
  const { name } = newLabelMetadata;
  const labels = getLabelsStorage();

  const newLabel = {
    id: `label-${getUniqueTime()}`,
    name: name.trim(),
  };

  localStorage.setItem("labels", JSON.stringify([...labels, newLabel]));

  return [...labels, newLabel];
}

export function updateLabelStorage(
  updatedLabelId: string,
  newLabelMetadata: LabelMetadata
): Label[] {
  const labels = getLabelsStorage().map((label: Label) => {
    if (label.id === updatedLabelId) {
      return { ...label, name: newLabelMetadata.name.trim() };
    }
    return label;
  });

  localStorage.setItem("labels", JSON.stringify(labels));
  return labels;
}

export function deleteLabelStorage(deletedLabelId: string): Label[] {
  const labels = getLabelsStorage().filter(
    (label: Label) => label.id !== deletedLabelId
  );

  localStorage.setItem("labels", JSON.stringify(labels));
  return labels;
}

export function getLabelNameById(labelId: string = ""): string {
  if (labelId === "") return "No Label";

  const labels = getLabelsStorage();
  const label = labels.find((label: Label) => label.id === labelId);
  return label ? label.name : "No Label";
}
