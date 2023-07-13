"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import isEmail from "validator/es/lib/isEmail";
import css from "./index.module.css";
import { AiFillGithub } from "react-icons/ai";
import { toast } from "react-toastify";

interface IUserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "register";
}

enum EFormFieldName {
  Email = "email",
  Passwd = "password",
}

type TFormValues = {
  [EFormFieldName.Email]: string;
  //   [EFormFieldName.Passwd]: string;
};

const baseCallBackUrl = "/user";

export function UserAuthForm({
  className,
  type,
  ...props
}: IUserAuthFormProps) {
  const { register, handleSubmit, formState } = useForm<TFormValues>({
    mode: "onChange",
    criteriaMode: "all",
  });
  const router = useRouter();

  const processRef = useRef(false);
  const searchParams = useSearchParams();

  return (
    <div>
      <Input
        {...register(EFormFieldName.Email, {
          required: "邮箱不能为空",
          validate: (v) => {
            if (!isEmail(v)) {
              return "邮箱格式不正确";
            }
            return true;
          },
        })}
        type="text"
        autoComplete="email"
        className={css.input}
        placeholder="请输入邮箱"
      />
      <p className={css.errorMsg}>{formState.errors?.email?.message}</p>
      {/* <Input
        {...register(EFormFieldName.Passwd, {
          required: "密码不能为空",
          minLength: {
            message: "最短不能小于6位",
            value: 6,
          },
          maxLength: {
            message: "最长不能超过12位",
            value: 12,
          },
        })}
        type="password"
        autoComplete="password"
        className={css.input}
        placeholder="请输入密码"
      />
      <p className={css.errorMsg}>{formState.errors?.password?.message}</p> */}
      <button
        type="button"
        onClick={() => {
          if (processRef.current) {
            toast.info("请等待上个操作完成");
            return;
          }
          const startAuthTask = handleSubmit((v) => {
            const authTask = signIn("email", {
              email: v[EFormFieldName.Email],
              redirect: false,
              callbackUrl: baseCallBackUrl,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                processRef.current = false;
              });
            processRef.current = true;
            toast.promise(authTask, {
              pending: "正在发送邮件",
              success: "请点击邮件内链接继续",
              error: "发生错误",
            });
          });
          startAuthTask();
        }}
        className={css.submit}
      >
        发送登陆链接到邮箱
      </button>
      <p className={css.otherText}>或者通过以下方式授权登陆</p>
      <button
        className={css.github}
        onClick={() => {
          if (processRef.current) {
            toast.info("请等待上个操作完成");
            return;
          }
          processRef.current = true;
          const authTask = signIn("github", {
            callbackUrl: baseCallBackUrl,
          }).then((res) => {
            processRef.current = false;
          });
          toast.promise(authTask, {
            pending: "正在连接GitHub",
            success: "正在与GitHub交换数据",
            error: "发生错误",
          });
        }}
      >
        <AiFillGithub size={22} className={css.threeIcon} />
        <span className={css.threeText}>GitHub</span>
      </button>
    </div>
  );
}
