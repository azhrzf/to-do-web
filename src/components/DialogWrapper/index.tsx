import { useState, ReactNode } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface DialogWrapperProps {
  buttonConfig: {
    name: string;
    icon: ReactNode;
  };
  children: ReactNode;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  buttonConfig,
  children,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button
        className="button-basic primary-link-bg basic-flex-middle"
        onClick={openDialog}
      >
        {buttonConfig.icon}
        <p>{buttonConfig.name}</p>
      </button>
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            {children}
            <button
              onClick={closeDialog}
              className="button-basic danger-link-bg basic-flex-middle"
            >
              <IoMdCloseCircle />
              <p>Close</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogWrapper;
