"use server";
import { UnauthorizedError } from "@/lib/exceptions/custom-hooks";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import type { Snippet } from "@prisma/client";

export async function addSnippetAction({
  code,
  language,
}: Pick<Snippet, "code" | "language">) {
  const user = await getCurrentUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  try{
    await prisma.snippet.create({
      data: {
        userId: user?.id,
        code,
        language,
      },
    })
  } catch (e) {
    console.log(e)
    return new Error("Something went wrong!")
  }
}
