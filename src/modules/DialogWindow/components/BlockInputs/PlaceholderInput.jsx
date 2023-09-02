import { Box } from "@mui/joy";
import { motion } from "framer-motion";
const PlaceholderInput = () => {
  return (
    <Box
      position="absolute"
      top="1rem"
      left="0.75rem"
      sx={{ userSelect: "none", cursor: "text", pointerEvents: "none" }}
      component={motion.span}
      initial={{
        x: 20,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
    >
      Напишите сообщение...
    </Box>
  );
};

export default PlaceholderInput;
