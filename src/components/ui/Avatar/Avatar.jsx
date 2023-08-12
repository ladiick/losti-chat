import * as Logo from "@radix-ui/react-avatar";
import React from "react";
import { BsCamera } from "react-icons/bs";
import { HOST } from "../../api/HOST";
import IndicatorOnline from "../IndicatorOnline/IndicatorOnline";
import s from "./Avatar.module.scss";

const Avatar = ({ sizeIndicator, online, size, image }) => {
  const sizeImage = {
    width: size,
    height: size,
  };
console.log(image);
  return (
    <Logo.Root className={s.AvatarRoot} style={sizeImage}>
      <Logo.Image className={s.AvatarImage} src={`${HOST + image}`} alt={"avatar"} />
      <Logo.Fallback className={s.AvatarFallback}>
        <BsCamera color="var(--text--accent)" size={size ? size / 2 : 24} />
      </Logo.Fallback>
      {online && <IndicatorOnline size={sizeIndicator} />}
    </Logo.Root>
  );
};

export default Avatar;
