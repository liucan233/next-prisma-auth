"use client";

import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";

type TProps = InputHTMLAttributes<HTMLInputElement>;

const Input: ForwardRefRenderFunction<HTMLInputElement, TProps> = (
  props,
  ref
) => {
  return <input {...props} ref={ref}/>;
};

const WrappedInput = forwardRef<HTMLInputElement, TProps>(Input);
export { WrappedInput as Input };
