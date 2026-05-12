"use client";

import Form from "@/components/Form";
import LinkListItem from "@/components/LinkListItem";
import type { Link } from "@/types/link";
import { useState, useEffect, useOptimistic, useTransition } from "react";
import { createLinkAction } from "@/app/actions";

type DashboardProps = {
  links: Link[];
};

export default function Dashboard({ links }: DashboardProps) {
  const [serverLinks, setServerLinks] = useState(links);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [settledOptimisticIds, setSettledOptimisticIds] = useState<
    Array<string | number>
  >([]);

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
    setError(null);

    if (!originalUrl) {
      setError("Please enter a URL.");

      return;
    }

    const optimisticId = crypto.randomUUID();

    const temporaryLink: Link = {
      id: optimisticId,
      code: "pending...",
      originalUrl,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      isPending: true,
    };

    startTransition(async () => {
      addOptimisticLink(temporaryLink);

      const result = await createLinkAction(formData);

      if (!result.success) {
        setError(result.error);
        setSettledOptimisticIds((current) => [...current, optimisticId]);

        return;
      }

      setSettledOptimisticIds((current) => [...current, optimisticId]);
      setServerLinks((currentLinks) => [
        result.link,
        ...currentLinks.filter((link) => link.id !== result.link.id),
      ]);
    });
  }

  const visibleLinks = optimisticLinks.filter(
    (link) => !settledOptimisticIds.includes(link.id),
  );

  return (
    <main className="font-sans flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">URL Shortener</h1>
      </section>

      <Form action={handleSubmit} isPending={isPending} />

      {error && <p className="max-w-xl text-sm text-red-600">{error}</p>}

      <section className="flex w-full max-w-3xl flex-col gap-4 text-left">
        <h2 className="text-lg font-semibold">Links</h2>

        {visibleLinks.length === 0 ? (
          <p className="rounded-lg border border-black/10 bg-white p-4 text-sm text-foreground/60 shadow-sm dark:border-white/15 dark:bg-white/5">
            No links created yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {visibleLinks.map((link) => (
              <LinkListItem key={link.id} link={link} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
