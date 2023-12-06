import { Box, Sheet } from "@mui/joy";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { HOST } from "../../components/api/HOST";
import Typography from "../../components/ui/Typography/Typography";

const Settings = () => {
  const { aboutUser } = useSelector((state) => state.user);
  return (
    <Sheet
      component={motion.div}
      initial={{ left: -100, opacity: 0 }}
      animate={{ left: 0, opacity: 1 }}
      exit={{ left: -100, opacity: 0 }}
      sx={{
        position: "absolute",
        top: "3.5rem",
        left: 0,
        bottom: 0,
        zIndex: 20,
        width: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={`${HOST}${aboutUser.image}`}
          style={{ width: "100%", height: 444, objectFit: "cover" }}
        />
        <Box sx={{ position: "absolute", bottom: 20, left: 20 }}>
          <Typography level="h3">
            {aboutUser.first_name} {aboutUser.last_name}
          </Typography>
        </Box>
      </Box>
    </Sheet>
  );
};

export default Settings;
