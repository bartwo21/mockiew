/* eslint-disable @typescript-eslint/no-explicit-any */
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
    redirectTo: "/?successLogin=true",
  };

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
    redirectTo: "/?successRegister=true",
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

export const saveInterviewAndInterviewQuestions = async (
  userEmail: string,
  jobTitle: string,
  questions: { questionText: string; answerText: string }[] // Hem sorular hem de cevaplar
) => {
  const user = await getUserByEmail(userEmail);
  try {
    // 1. Mülakatı oluştur
    console.log("user", user.id);
    console.log("jobTitle", jobTitle);
    console.log("questions", questions);
    const interview = await db.interview.create({
      data: {
        userId: user.id, // Mülakatı oluşturan kullanıcı
        jobTitle: jobTitle, // Mülakatın iş tanımı
        status: "pending", // Mülakatın başlangıç durumu
      },
    });

    // 2. Soruları ve cevapları kaydet
    const savedQuestions = await db.question.createMany({
      data: questions.map((q) => ({
        interviewId: interview.id, // Sorular ilgili mülakat ile ilişkilendiriliyor
        questionText: q.questionText, // Soru metni
        response: q.answerText, // Cevap metni
      })),
    });

    return { success: true, interview, savedQuestions };
  } catch (error) {
    console.error("Mülakat ve sorular kaydedilirken bir hata oluştu:", error);
    return { success: false, error: (error as Error).message };
  }
};
