import { Suspense, lazy, useState } from "react";
import { useSelector } from "react-redux";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import { pageSelector } from "../../redux/slices/pages";
import DialogsUsers from "../DialogsUsers/DialogsUsers";
import MainHeader from "./components/MainHeader";

const Friends = lazy(() => import("../Friends/Friends"));

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
      <MainHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      <DialogsUsers searchValue={searchValue} />
      {friends !== null && (
        <Suspense>
          <Friends />
        </Suspense>
      )}
    </WrapperBlocks>
  );
};

export default LeftColumn;
