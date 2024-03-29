import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ActionButton } from "../ui/Button/ActionButton/ActionButton";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileInfoAnotherUser from "./ProfileInfoAnotherUser/ProfileInfoAnotherUser";

const ProfileInfoMe = () => {
  const { id } = useParams();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const aboutUserMe = useSelector((state) => state.user.aboutUser);
  const navigate = useNavigate();

  if (myId && myId != id) {
    return <ProfileInfoAnotherUser />;
  }

  return (
    <ProfileInfo
      online={aboutUserMe?.settings?.online}
      image={aboutUserMe?.image}
      firstName={aboutUserMe?.first_name}
      lastName={aboutUserMe?.last_name}
    >
      <ActionButton leftIcon={<FaUserEdit />} second onClick={() => navigate("/menu/edit")}>
        Редактировать профиль
      </ActionButton>
    </ProfileInfo>
  );
};

export default ProfileInfoMe;
