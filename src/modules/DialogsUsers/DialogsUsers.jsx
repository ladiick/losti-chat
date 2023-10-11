import { Search } from "@mui/icons-material";
import { CircularProgress, Input } from "@mui/joy";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/navigationSlice";
import { MyContext } from "../Layout/Layout";
import MainHeader from "./components/MainHeader/MainHeader";
import People from "./components/People/ListPeople";
const DialogsUsers = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.navigation);
  const { statusSocket } = useContext(MyContext);
  return (
    <>
      <MainHeader>
        <Input
          fullWidth
          endDecorator={statusSocket === "pending" ? <CircularProgress color="danger" value={50} size="sm" variant="plain" /> : <Search />}
          type="text"
          placeholder={statusSocket === "pending" ? "Соединение..." : "Поиск"}
          value={searchValue}
          maxLength="30"
          onChange={({ target: { value } }) => dispatch(setSearchValue(value))}
          sx={{ boxShadow: "xs" }}
        />
      </MainHeader>
      <People />
    </>
  );
};

export default DialogsUsers;
