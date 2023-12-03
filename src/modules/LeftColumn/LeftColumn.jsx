import { AnimatePresence } from "framer-motion";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import { pageSelector } from "../../redux/slices/pages";
import DialogsUsers from "../DialogsUsers/DialogsUsers";
import Friends from "../Friends/Friends";
import MainHeader from "./components/MainHeader";

export const LeftColumnContext = createContext();

const LeftColumn = () => {
  const { friends } = useSelector((state) => pageSelector(state));
  const [searchValue, setSearchValue] = useState("");

  return (
    <WrapperBlocks
      sx={{
        width: "415px",
        minWidth: "20rem",
        maxWidth: "40vw",
        position: "relative",
        borderRight: "1px solid",
        borderColor: "divider",
        "@media(max-width: 768px)": {
          maxWidth: "none",
          width: "100%",
        },
      }}
    >
      <LeftColumnContext.Provider value={{ searchValue, setSearchValue }}>
        <MainHeader />
        <DialogsUsers />
        <AnimatePresence>{friends && <Friends />}</AnimatePresence>
      </LeftColumnContext.Provider>
    </WrapperBlocks>
  );
};

export default LeftColumn;
