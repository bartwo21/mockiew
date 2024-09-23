"use server";

import { signOut, signIn } from "@/lib/Auth";
import { db } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/helper";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: "USER",
    redirectTo: "/",
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);
  console.log(existingUser);

  try {
    await signIn("credentials", rawFormData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.message) {
        case "CredentialsSignin":
          return { error: "Kullanıcı adı veya şifre hatalı." };
        default:
          return { error: "Bir hata oluştu." };
      }
    }

    throw error;
  }
  revalidatePath("/");
};

export const registerWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    role: "USER",
    redirectTo: "/",
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);

  if (existingUser) {
    return { error: "Bu email ile zaten kayıtlı bir kullanıcı var." };
  }

  try {
    // Yeni kullanıcı oluşturuluyor.
    const hashedPassword = saltAndHashPassword(rawFormData.password);

    await db.user.create({
      data: {
        email: rawFormData.email,
        name: rawFormData.name,
        hashedPassword,
        role: rawFormData.role,
      },
    });

    // Kullanıcıyı giriş yaptıralım.
    await signIn("credentials", rawFormData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.message) {
        case "CredentialsSignin":
          return { error: "Kullanıcı adı veya şifre hatalı." };
        default:
          return { error: "Bir hata oluştu." };
      }
    }

    throw error;
  }

  revalidatePath("/");
};