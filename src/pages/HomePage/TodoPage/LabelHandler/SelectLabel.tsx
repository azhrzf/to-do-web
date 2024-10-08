import { Label } from "@/utils/storage/labels";

interface SelectLabelProps {
  selectedLabel: string;
  handleLabelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  verifiedLabels: Label[];
}

const SelectLabel: React.FC<SelectLabelProps> = ({
  selectedLabel,
  handleLabelChange,
  verifiedLabels,
}) => {
  return (
    <div className="input__form_input">
      <label htmlFor="label-select">Select label:</label>
      <select
        name="labelId"
        id="label-select"
        value={selectedLabel}
        onChange={handleLabelChange}
      >
        <option value="">- All Labels -</option>
        {verifiedLabels.map((label) => {
          return (
            <option key={label.id} value={label.id}>
              {label.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectLabel;
