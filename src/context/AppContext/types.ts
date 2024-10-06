import { Label, LabelMetadata } from "@/utils/storage/labels";
import { Todo, TodoMetadata } from "@/utils/storage/todos";

export interface LabelsContextProps {
  labels: Label[];
  addLabel: (newLabelMetadata: LabelMetadata) => Label;
  updateLabel: (
    updatedLabelId: string,
    updatedLabelMetadata: LabelMetadata
  ) => void;
}

export interface TodosContextProps {
  todos: Todo[];
  addTodo: (newTodoMetadata: TodoMetadata) => Todo;
  updateTodo: (
    updatedTodoId: string,
    updatedTodoMetadata: TodoMetadata
  ) => void;
}
