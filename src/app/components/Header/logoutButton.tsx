"use client";
import { DOMAIN } from "@/utils/constance";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ButtonSpinner from "../buttonSpinner";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const HandleLogout = () => {
    setLoading(true);
    axios
      .get(`${DOMAIN}/api/users/logout`)
      .then(() => router.refresh())
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <button className="cursor-pointer" onClick={HandleLogout}>
      {loading? <ButtonSpinner/> : "Logout"}
    </button>
  );
};

export default LogoutButton;
