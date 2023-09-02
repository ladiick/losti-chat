import { Delete, Image, MoreVert } from "@mui/icons-material";
import { Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem } from "@mui/joy";
import React from "react";
import { BsTrash3 } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { openModalBlock } from "../../../../../redux/slices/navigationSlice";

const RightSideBlock = () => {
  const dispatch = useDispatch();
  const viewAttachmentsInDialogs = useSelector((state) => state.navigation.modal.viewAttachmentsInDialogs);
  const [searchParams, setSearchParams] = useSearchParams();

  const items = [
    {
      title: "Показать вложения",
      icon: <HiOutlinePhotograph />,
      func: () => {
        setSearchParams({
          dialogs: searchParams.get("dialogs"),
          history: `${searchParams.get("dialogs")}_photo`,
        });
        dispatch(openModalBlock({ viewAttachmentsInDialogs: true }));
      },
    },
    {
      title: "Очистить диалог",
      icon: <BsTrash3 />,
    },
  ];

  return (
    <Dropdown>
      <>
        <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "plain", color: "neutral" } }}>
          <MoreVert />
        </MenuButton>

        {!viewAttachmentsInDialogs && (
          <Menu placement="bottom-end">
            <MenuItem>
              <ListItemDecorator>
                <Image />
              </ListItemDecorator>
              Показать вложения
            </MenuItem>
            <MenuItem>
              <ListItemDecorator>
                <Delete />
              </ListItemDecorator>
              Очистить диалог
            </MenuItem>
          </Menu>
        )}
      </>
    </Dropdown>
  );
};

export default RightSideBlock;
