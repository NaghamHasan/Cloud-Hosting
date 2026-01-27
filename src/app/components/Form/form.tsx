"use client";
import "./form.css";
import React, { ChangeEvent, useState } from "react";
import module from "../../components/Header/header.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constance";
import ButtonSpinner from "../buttonSpinner";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";

interface IsRegister {
  value: boolean;
}

const Form = ({ value }: IsRegister) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [click, setClick] = useState(false);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    setClick(true);
    e.preventDefault();
    if (
      form.email.length < 8 ||
      form.password.length < 8 ||
      (value && name.length < 1)
    ) {
      e.preventDefault();
    } else {
      setLoading(true);
      await axios
        .post(
          `${DOMAIN}/api/users/${value ? "register" : "login"}`,
          value ? { username: name, ...form } : form
        )
        .then(() => {
          router.replace("/");
          router.refresh();
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setStatus(err.response.data.message);
          setLoading(false);
        });
    }
  };
  return (
    <form className="flex flex-col" onSubmit={submit}>
      {value ? (
        <div className="mb-7">
          <input
            className="border-2 mb-2 w-full border-[#94a3b8] rounded p-2 outline-none"
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
          />
          <label>Name</label>
          {name.length < 1 && click && (
            <span className="text-red-700 text-sm absolute left-0 -bottom-3">
              The name must be more than 0
            </span>
          )}
        </div>
      ) : (
        ""
      )}
      <div>
        <input
          className="border-2 mb-2 w-full border-[#94a3b8] rounded p-2 outline-none"
          type="email"
          name="email"
          value={form.email}
          onChange={change}
          placeholder="Enter your email"
        />
        <label>Email</label>
        {form.email.length < 8 && click && (
          <span className="text-red-700 text-sm absolute left-0 -bottom-3">
            This email must be more than 8
          </span>
        )}
      </div>
      <div className="my-7">
        <input
          className="border-2 mb-2 w-full border-[#94a3b8] outline-none rounded p-2"
          type="password"
          name="password"
          value={form.password}
          onChange={change}
          placeholder="Enter your password"
        />
        <label>Password</label>
        {form.password.length < 8 && click && (
          <span className="text-red-700 text-sm absolute left-0 -bottom-3">
            This password must be more than 8
          </span>
        )}
      </div>
      <button
        disabled={loading}
        className={`main-btn ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        } transition`}
        type="submit"
      >
        {loading ? <ButtonSpinner /> : value ? "Sign up" : "Sign in"}
      </button>
      {status && (
        <span className="text-red-700 text-sm absolute left-0 -bottom-5">
          {status}
        </span>
      )}
      <div className="text-center mt-9 font-bold">
        {value ? "Already have an account ? " : "New here ? "}
        <Link className="special-text" href={value ? "/login" : "/register"}>
          {value ? "Sign in" : "Create new account"}
        </Link>
      </div>
      <div className="relative flex py-8 items-center">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">
          Or
        </span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>
      <div className="text-center">
        <Link
          href="/"
          className="text-gray-400 font-bold hover:text-[#00d1ff] transition-colors duration-30"
        >
          Back to home page
        </Link>
      </div>
    </form>
  );
};

export default Form;
