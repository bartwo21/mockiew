"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { login } from "../../../actions/actions";

export default function LoginGithub() {
  return (
    <div
      onClick={() => login("github")}
      className="w-full gap-4 hover:cursor-pointer h-12 bg-black rounded-md p-4 flex justify-center items-center"
    >
      <FaGithub />
      <p className="text-white">Github ile giriş yap</p>
    </div>
  );
}
