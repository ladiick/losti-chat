import { ModalDialog, Modal as MuiModal } from "@mui/joy";
import { keyframes } from "@mui/system";
const overlay = keyframes`
  from {
    backdrop-filter: blur(8px);
    opacity: 1;
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
`;

const content = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 20%);
  }
  to {
    opacity: 1;
    transform: translate(-50%,-50%);
  }
`;
const Modal = ({ children, ...props }) => {
  return (
    <MuiModal {...props} sx={{ animation: `${overlay} 300ms forwards` }}>
      <ModalDialog layout="center" size="md" variant="plain" sx={{ animation: `${content} 300ms` }}>
        {children}
      </ModalDialog>
    </MuiModal>
  );
};

export default Modal;
