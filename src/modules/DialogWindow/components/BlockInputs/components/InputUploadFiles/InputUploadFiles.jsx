import { AttachFile } from "@mui/icons-material";
import { FormControl, FormLabel, Input, useTheme } from "@mui/joy";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { onChangeFileDialog } from "../../../../../../redux/slices/messageSlice";
const inputHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  m: -1,
  border: 0,
  p: 0,
  whiteSpace: "nowrap",
  clipPath: " inset(100%)",
  clip: "rect(0 0 0 0)",
  overflow: "hidden",
};
const InputUploadFiles = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const handlerFilesUploader = (file) => {
    console.log(file.target.files);
    dispatch(
      onChangeFileDialog({
        id: searchParams.get("dialogs"),
        file: file.target.files,
      }),
    );
  };
  return (
    <FormControl
      sx={{
        width: "3.5rem",
        height: "3.5rem",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <FormLabel
        sx={{
          m: 0,
          cursor: "pointer",
          alignSelf: "center",
          "& svg": {
            transform: "rotate(45deg)",
          },
          "& svg:hover": {
            fill: theme.vars.palette.primary.solidBg,
          },
        }}
      >
        <AttachFile />
      </FormLabel>
      <Input type="file" sx={inputHidden} multiple={true} onChange={handlerFilesUploader} />
    </FormControl>
  );
};

export default InputUploadFiles;
