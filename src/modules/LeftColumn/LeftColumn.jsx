import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import DialogsUsers from "../DialogsUsers/DialogsUsers";
const LeftColumn = () => {
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
      <DialogsUsers />
    </WrapperBlocks>
  );
};

export default LeftColumn;
