"use client";
import React, { useState } from "react";
import module from "@/app/components/Header/header.module.css";
import { FiMenu } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";
import HeaderLink from "./HeaderLink";
import { linksInfo } from "@/utils/linksInfo";

interface NavBarProps {
  isAdmin: boolean;
}

const NavBar = ({ isAdmin }: NavBarProps) => {

  const [menuOpen, setOpenMenu] = useState(false);

  const linksShow = linksInfo.map((el, key) => (
    !isAdmin && el.title === "Admin" ? "" : <HeaderLink
      key={key}
      title={el.title}
      href={el.href}
      setOpenMenue={setOpenMenu}
    />
  ));

  return (
    <nav className={"flex items-center justify-between main-color"}>
      <div className={module.menu} onClick={() => setOpenMenu((prev) => !prev)}>
        {menuOpen ? <IoCloseCircle /> : <FiMenu />}
      </div>
      <div className={`${module.links}`}>
        <ul
          className="z-200 black-bg"
          style={{
            clipPath: menuOpen ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
          }}
        >
          {linksShow}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
