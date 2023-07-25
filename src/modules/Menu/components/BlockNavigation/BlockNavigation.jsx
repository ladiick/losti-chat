import React from "react";
import WrapperBlocks from "../../../../components/ui/WrapperBlocks/WrapperBlocks";

import ListItems from "../../../../components/ui/Navigation/components/ListItems/ListItems";
import NavigationItem from "../../../../components/ui/Navigation/components/NavigationItem/NavigationItem";
import NavigationWrapper from "../../../../components/ui/Navigation/components/NavigationWrapper/NavigationWrapper";
import { menuItems } from "../../helpers/menuItems.js";

const BlockNavigation = ({ ...props }) => {
  return (
    <WrapperBlocks {...props}>
      <NavigationWrapper>
        <ListItems>
          {menuItems.map((item) => (
            <NavigationItem key={item.href} obj={item} style={{ padding: "10px 12px" }} />
          ))}
        </ListItems>
      </NavigationWrapper>
    </WrapperBlocks>
  );
};

export default BlockNavigation;
