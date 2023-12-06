import { Sheet } from "@mui/joy";
import { motion } from "framer-motion";

const WrapperPages = () => {
  return (
    <Sheet
      component={motion.div}
      initial={{ left: -100, opacity: 0 }}
      animate={{ left: 0, opacity: 1 }}
      exit={{ left: -100, opacity: 0 }}
      onHoverStart={toggleVisibleFindButtonStart}
      onHoverEnd={toggleVisibleFindButtonEnd}
      sx={{
        position: "absolute",
        top: "3.5rem",
        left: "0",
        bottom: "0",
        zIndex: 20,
        width: "100%",
      }}
    ></Sheet>
  );
};

export default WrapperPages;
