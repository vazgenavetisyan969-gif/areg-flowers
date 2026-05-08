import React from "react";
import { MenuWrapper, MenuItem } from "./styled";
import { Link } from "react-router-dom";

const aboutItems = [
  { id: 1, title: "Ատրակցիոններ" },
  { id: 2, title: "Խաղահրապարակ" },
  { id: 3, title: "Արկադային խաղեր" },
  { id: 4, title: "Սահադաշտ" },
  { id: 5, title: "Կանոններ" },
];

export default function AboutMenu1() {
  return (
    <MenuWrapper>
      {aboutItems.map((item, index) => (
        <Link to={`/pocrner/${item.id}`} key={index}>
          <MenuItem>{item.title}</MenuItem>
        </Link>
      ))}
    </MenuWrapper>
  );
}