"use client";

import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes, FC } from "react";

type TProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export const SignOut: FC<TProps> = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      退出登录
    </button>
  );
};
