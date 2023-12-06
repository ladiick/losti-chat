import { Modal, Sheet } from "@mui/joy";
import { motion } from "framer-motion";
import FriendsFind from "../components/FriendsFind/FriendsFind";

const FindFriendsModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      component={motion.div}
      initial={{ opacity: 0, backdropFilter: "blur(0)" }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(8px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0)",
      }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        component={motion.div}
        initial={{ top: "-100%", opacity: 0 }}
        animate={{ top: 0, opacity: 1 }}
        exit={{ top: "100%", opacity: 0 }}
        sx={{
          height: 400,
          width: 350,
          p: "0.75rem",
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          outline: "none",
        }}
      >
        <FriendsFind />
      </Sheet>
    </Modal>
  );
};

export default FindFriendsModal;
