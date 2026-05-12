"use client";

import Form from "@/components/Form";
import LinkListItem from "@/components/LinkListItem";
import type { Link } from "@/types/link";
import {
  useState,
  useEffect,
  useOptimistic,
  useRef,
  useTransition,
} from "react";
import { createLinkAction } from "@/app/actions";

type DashboardProps = {
  links: Link[];
};

export default function Dashboard({ links }: DashboardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [serverLinks, setServerLinks] = useState(links);
  const [isPending, startTransition] = useTransition();

  const [optimisticLinks, addOptimisticLink] = useOptimistic(
    serverLinks,
    (currentLinks, newLink: Link) => [newLink, ...currentLinks],
  );

  useEffect(() => {
    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch("/api/links", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = (await response.json()) as { links: Link[] };

        setServerLinks(data.links);
      } catch (error) {
        console.error("Failed to refresh links:", error);
      }
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  function handleSubmit(formData: FormData) {
    const originalUrl = String(formData.get("originalUrl") || "").trim();

    if (!originalUrl) return;

    const temporaryLink: Link = {
      id: Date.now(),
      code: "pending...",
      originalUrl,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      isPending: true,
    };

    addOptimisticLink(temporaryLink);
    formRef.current?.reset();

    startTransition(async () => {
      await createLinkAction(formData);
    });
  }

  return (
    <main className="font-sans flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">URL Shortener</h1>
      </section>

      <Form ref={formRef} action={handleSubmit} isPending={isPending} />

      <section className="flex w-full max-w-3xl flex-col gap-4 text-left">
        <h2 className="text-lg font-semibold">Links</h2>

        {optimisticLinks.length === 0 ? (
          <p className="rounded-lg border border-black/10 bg-white p-4 text-sm text-foreground/60 shadow-sm dark:border-white/15 dark:bg-white/5">
            No links created yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {optimisticLinks.map((link) => (
              <LinkListItem key={link.id} link={link} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
