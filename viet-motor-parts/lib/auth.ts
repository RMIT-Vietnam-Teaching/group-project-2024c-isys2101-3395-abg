'use server';

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function getAuthStatus(){
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    return token ? true : false;
}

export async function getAuthToken(){
    const cookieStore = cookies();
    return cookieStore.get("token")?.value;
}

export async function logout(){
    const cookieStore = cookies();
    cookieStore.delete("token");
    // refresh the page
    redirect("/");
}