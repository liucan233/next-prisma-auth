"use client";

import { FC, ReactNode } from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TProps = ToastContainerProps & { children?: ReactNode };

export const ClientToast: FC<TProps> = (props) => {
  return (
    <>
      <ToastContainer {...props} />
      {props.children}
    </>
  );
};
