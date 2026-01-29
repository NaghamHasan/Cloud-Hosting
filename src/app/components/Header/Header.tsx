import React from "react";
import NavBar from "./NavBar";
import Link from "next/link";
import module from "./header.module.css";
import { JwtPaload } from "@/utils/types";
import { VerifyTokenPages } from "@/utils/verifyToken";
import LogoutButton from "./logoutButton";
import Image from "next/image";

const Header = async () => {
  const userInformation = (await VerifyTokenPages()) as JwtPaload;

  return (
    <header
      className={`fixed top-0 z-10 w-full flex justify-center items-center h-15`}>
      <div className="container py-1 black-bg px-6 main-text-color flex w-full justify-between rounded-3xl items-center">
        <div className="font-bold relative text-2xl hidden md:inline-block">
        <Image src={"/cloud hosting-logo (1).png"} alt="bhv" width={"150"} height={"150"} priority className="object-contain"/>
      </div>
        <div>
          <NavBar isAdmin={userInformation?.isAdmin} />
        </div>
        {userInformation ? (
            <div className="main-btn">
              <LogoutButton />
            </div>
        ) : (
          <div className={module.auth}>
            <Link className="main-btn" href={"/login"}>
              Sign in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
