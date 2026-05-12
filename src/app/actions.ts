"use server";

import { createLink } from "@/lib/links";
import type { Link } from "@/types/link";
import { revalidatePath } from "next/cache";

export type CreateLinkResult =
  | { success: true; link: Link }
  | { success: false; error: string };

const TEST_SERVER_DELAY_MS = 3000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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
    await delay(TEST_SERVER_DELAY_MS);

    const originalUrl = validateUrl(formData.get("originalUrl"));

    const code = generateCode();

    const link = createLink(code, originalUrl);

    revalidatePath("/");
    return { success: true, link };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
}
