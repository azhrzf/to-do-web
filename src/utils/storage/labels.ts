import slugify from "slugify";
import { getUniqueTime } from "../helpers";

export interface LabelMetadata {
  name: string;
  slug: string;
}

export interface Label extends LabelMetadata {
  id: string;
}

export interface LabelsContextProps {
  labels: Label[];
  addLabel: (newLabelMetadata: LabelMetadata) => void;
  updateLabel: (
    updatedLabelId: string,
    updatedLabelMetadata: LabelMetadata
  ) => void;
}

export function getLabelsStorage(): Label[] {
  const dateNow = new Date();

  const newLabel = {
    id: `label-${dateNow.getTime()}`,
    name: "No Label",
    slug: `no-label-${dateNow.getTime()}`,
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

function verifySlug(slug: string, labels: Label[]): string {
  const slugHandler = slugify(slug);
  if (labels.find((label: Label) => label.slug === slugHandler)) {
    return `${slugHandler}-${getUniqueTime()}`;
  }

  return slugHandler;
}

export function addLabelStorage(newLabelMetadata: LabelMetadata): Label[] {
  const { name, slug } = newLabelMetadata;
  const labels = getLabelsStorage();
  const verifiedSlug = verifySlug(slug, labels);

  const newLabel = {
    id: `label-${getUniqueTime()}`,
    name: name.trim(),
    slug: verifiedSlug,
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
      return { ...label, ...newLabelMetadata };
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
