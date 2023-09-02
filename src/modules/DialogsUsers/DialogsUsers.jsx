import { Search } from "@mui/icons-material";
import { Input } from "@mui/joy";
import { useContext, useState } from "react";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import { MyContext } from "../Layout/Layout";
import ConnectionLost from "./components/ConnetionLost/ConnectionLost";
import MainHeader from "./components/MainHeader/MainHeader";
import People from "./components/People/ListPeople";
const DialogsUsers = () => {
  const [searchValue, setSearch] = useState("");
  const { isMobile } = useMatchMedia();
  const { statusSocket } = useContext(MyContext);

  return (
    <WrapperBlocks sx={{ width: isMobile ? "100%" : "436px", position: "relative", borderRight: "1px solid", borderColor: "divider" }}>
      <MainHeader>
        {statusSocket === "pending" ? (
          <ConnectionLost />
        ) : (
          <Input
            fullWidth
            endDecorator={<Search />}
            type="text"
            placeholder="Поиск"
            value={searchValue}
            maxLength="30"
            onChange={({ target: { value } }) => setSearch(value)}
          />
        )}
      </MainHeader>

      <People searchValue={searchValue} setSearch={setSearch} />
    </WrapperBlocks>
  );
};

export default DialogsUsers;
