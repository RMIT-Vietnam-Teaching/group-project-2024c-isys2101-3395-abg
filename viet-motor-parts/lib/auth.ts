'use server';

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function Authentication(){
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    return token ? true : false;
}

export async function Logout(){
    const cookieStore = cookies();
    cookieStore.delete("token");
    // refresh the page
    redirect("/");
}