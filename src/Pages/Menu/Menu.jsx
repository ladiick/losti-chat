import React, { useEffect } from "react";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import BlockNavigation from "../../modules/Menu/components/BlockNavigation/BlockNavigation";
import MenuOptions from "../../modules/Menu/components/MenuOptions/MenuOptions";

const Menu = () => {
  const { isMobile } = useMatchMedia();
  useEffect(() => {
    document.title = "Меню";
  }, []);
  return (
    <>
      <MenuOptions />
      {!isMobile && <BlockNavigation style={{ width: "35%", height: "fit-content" }} />}
    </>
  );
};

export default Menu;
