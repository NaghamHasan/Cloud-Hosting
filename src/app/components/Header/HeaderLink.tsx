"use client"
import Link from "next/link";
import module from "./header.module.css"
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

interface HeaderLinkParams {
    href: string,
    title: string,
    setOpenMenue: Dispatch<SetStateAction<boolean>>
}

const HeaderLink = ({href,title,setOpenMenue}: HeaderLinkParams) => {
  const pathname = usePathname();
  const isActive = href==="/" ? pathname==="/" : pathname.startsWith(href);
  console.log("pathname : " + pathname,"href:"+href)

  return (
    <Link onClick={() => {setOpenMenue(false);}} className={`${module.link} ${isActive ? "text-[#00d1ff]" :""}`} href={href === "/articles" ? "/articles?pageNumber=1": href}>
      {title}
    </Link>
  );
};

export default HeaderLink;
