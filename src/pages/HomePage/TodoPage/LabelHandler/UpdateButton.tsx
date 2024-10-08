import { FaEdit } from "react-icons/fa";
import DialogWrapper from "@/components/DialogWrapper";
import UpdateLabel from "@/components/UpdateLabel";

const UpdateConfig: React.FC = () => {
  return (
    <div className="button-basic primary-link-bg basic-flex-middle">
      <FaEdit />
      <p>Update Label</p>
    </div>
  );
};

interface UpdateLabelProps {
  selectedLabel: string;
}

const UpdateButton: React.FC<UpdateLabelProps> = ({ selectedLabel }) => {
  return (
    <div className="input__form_input">
      <p>Update label?</p>
      <DialogWrapper buttonConfig={<UpdateConfig />}>
        <UpdateLabel labelId={selectedLabel} />
      </DialogWrapper>
    </div>
  );
};

export default UpdateButton;
