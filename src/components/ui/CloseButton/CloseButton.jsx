import { Close } from "@mui/icons-material";
import React from "react";
import s from "./CloseButton.module.scss";
const CloseButton = ({ ...props }) => {
  return (
    <Close {...props} className={props.className ? `${props.className} ${s.close}` : s.close} />
  );
};

export default CloseButton;
