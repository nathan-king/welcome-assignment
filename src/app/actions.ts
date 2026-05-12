"use server";

import { createLink } from "@/lib/links";
import { revalidatePath } from "next/cache";

export type CreateLinkResult =
  | { success: true }
  | { success: false; error: string };

function generateCode(length = 6): string {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}

function validateUrl(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") {
    throw new Error("URL is required");
  }

  const trimmedValue = value.trim();

  try {
    const url = new URL(trimmedValue);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Invalid protocol");
    }

    return url.toString();
  } catch {
    throw new Error("Please enter a valid URL");
  }
}

export async function createLinkAction(
  formData: FormData,
): Promise<CreateLinkResult> {
  try {
    const originalUrl = validateUrl(formData.get("originalUrl"));

    const code = generateCode();

    createLink(code, originalUrl);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
}
