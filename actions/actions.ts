/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signOut, signIn } from "@/lib/Auth";
import { db } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/helper";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    const interview = await db.interview.create({
      data: {
        userId: user.id, // Mülakatı oluşturan kullanıcı
        jobTitle: jobTitle, // Mülakatın iş tanımı
        status: "pending", // Mülakatın başlangıç durumu
      },
    });

    // 2. Soruları ve cevapları kaydet
    await db.question.createMany({
      data: questions.map((q) => ({
        interviewId: interview.id, // Sorular ilgili mülakat ile ilişkilendiriliyor
        questionText: q.questionText, // Soru metni
        response: q.answerText, // Cevap metni
      })),
    });
    // return { success: true, interview, savedQuestions };
  } catch (error) {
    console.error("Mülakat ve sorular kaydedilirken bir hata oluştu:", error);
    return { success: false, error: (error as Error).message };
  }
  revalidatePath("/interviews");
  redirect("/interviews");
};

export const getAllInterviews = async (userEmail: string) => {
  const user = await getUserByEmail(userEmail);
  try {
    const interviews = await db.interview.findMany({
      where: {
        userId: user.id,
      },
    });

    return interviews;
  } catch (error) {
    console.error("Mülakatlar getirilirken bir hata oluştu:", error);
    return [];
  }
};

export const getInterview = async (interviewId: any) => {
  try {
    const interview = await db.interview.findUnique({
      where: {
        id: interviewId,
      },
      include: {
        questions: true,
        feedback: true,
      },
    });

    return interview;
  } catch (error) {
    console.error("Mülakat getirilirken bir hata oluştu:", error);
    return null;
  }
};

export const deleteInterview = async (interviewId: number) => {
  try {
    await db.interview.delete({
      where: {
        id: interviewId,
      },
    });
    await db.question.deleteMany({
      where: {
        interviewId,
      },
    });
    await db.feedback.deleteMany({
      where: {
        interviewId,
      },
    });
  } catch (error) {
    console.error("Mülakat silinirken bir hata oluştu:", error);
  }
  revalidatePath("/interviews");
};

export const saveAnswerToQuestion = async (
  questionId: number,
  answerText: string
) => {
  try {
    await db.question.update({
      where: {
        id: questionId,
      },
      data: {
        correctAnswer: answerText,
      },
    });
  } catch (error) {
    console.error("Cevap kaydedilirken bir hata oluştu:", error);
  }
};

export const getAnswerToQuestion = async (questionId: number) => {
  try {
    const question = await db.question.findUnique({
      where: {
        id: questionId,
      },
    });

    return question.correctAnswer;
  } catch (error) {
    console.error("Cevap getirilirken bir hata oluştu:", error);
    return null;
  }
};

export const saveFeedback = async (
  interviewId: string,
  feedbackText: string
) => {
  try {
    if (!feedbackText) {
      return;
    }

    await db.feedback.upsert({
      where: {
        interviewId: interviewId,
      },
      update: {
        content: feedbackText,
      },
      create: {
        interviewId: interviewId,
        content: feedbackText,
      },
    });
  } catch (error) {
    console.error("Feedback kaydedilirken bir hata oluştu:", error);
  }
};

export const getInterviewFeedback = async (interviewId: number) => {
  try {
    const feedback = await db.feedback.findUnique({
      where: {
        interviewId,
      },
    });
    if (!feedback) {
      return "";
    }
    return feedback.content;
  } catch (error) {
    console.error("Feedback getirilirken bir hata oluştu:", error);
    return [];
  }
};
