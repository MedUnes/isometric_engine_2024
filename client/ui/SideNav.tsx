import { Terrain } from "./Terrain"
import { Zoom } from "./Zoom"
import { Cluster, Stack } from "./layout-utilities/Cluster"

import admin from "../images/icons/admin.png";
import agriculture from "../images/icons/agriculture.png";
import civic from "../images/icons/civic.png";
import entertainment from "../images/icons/entertainment.png";
import house from "../images/icons/house.png";
import industry from "../images/icons/industry.png";
import storage from "../images/icons/storage.png";
import { useState } from "react";
import { SideMenuCategoryButtons } from "./elements/Buttons";
import styled from "styled-components";
import { colors } from "./useColours";

export const SideNav = () => {
  const [icons, setIcons] = useState([
    {label: "S", image: admin, display: <Terrain/>, active: false},
    {label: "S", image: agriculture, display: <p>agriculture</p>, active: true},
    {label: "S", image: civic, display: <p>civic</p>, active: false},
    {label: "S", image: entertainment, display: <p>entertainment</p>, active: false},
    {label: "S", image: house, display: <p>house</p>, active: false},
    {label: "S", image: industry, display: <p>industry</p>, active: false},
    {label: "S", image: storage, display: <p>storage</p>, active: false},
  ]);
  return (<StyledSidePanel>
    <Stack>
      {icons.map((icon, i) => {
        return <SideMenuCategoryButtons
          className={icon.active ? 'isActive' : ''}
          key={`side-menu-button-${i}`}
          imagesrc={icon.image}
          onClick={() => {
            const newIcons = icons.map((icon, j) => ({...icon, active: j === i}))
            setIcons(newIcons);
          }}
          ></SideMenuCategoryButtons>
      })}
    </Stack>
      <section>
        {icons.find(icon => icon.active)?.display}
      </section>
    </StyledSidePanel>
  )
}

const StyledSidePanel = styled(Cluster)`
  width: 14rem;
  flex-wrap: nowrap;
  background: ${colors.lightBlue};
`