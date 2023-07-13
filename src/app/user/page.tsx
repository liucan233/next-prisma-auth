import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { SignOut } from "@/components/SignOut"

export default async function Page(){
    const session = await getServerSession(nextAuthOptions)

    if(!session||!session.user){
        redirect('/')
    }
    return <main>
        {session.user.email}
        <SignOut />
    </main>
}