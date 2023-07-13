import Image from "next/image";
import css from "./page.module.css";
import { UserAuthForm } from "@/components/UserAuthForm";
import { ClientToast } from "@/components/ClientToast";
import { getServerSession } from "next-auth/next"
import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function Page() {
  const session=await getServerSession(nextAuthOptions);

  if(session){
    redirect('/user')
  }

  return (
    <ClientToast
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    >
      <div className={css.bg} />
      <div className={css.main}>
        <Image
          src="./vercel.svg"
          alt="logo"
          width={200}
          height={200}
          className={css.logo}
          priority={true}
        />
        <h2 className={css.hello}>🎉</h2>
        <UserAuthForm type="login" />
      </div>
    </ClientToast>
  );
}

export default Page;
