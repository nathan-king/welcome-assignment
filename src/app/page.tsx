import Form from "@/components/Form";
import LinkListItem from "@/components/LinkListItem";
import { getLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

export default function Home() {
  const links = getLinks();

  return (
    <main className="font-sans flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">URL Shortener</h1>
      </section>

      <Form />

      <section className="flex w-full max-w-3xl flex-col gap-4 text-left">
        <h2 className="text-lg font-semibold">Links</h2>

        {links.length === 0 ? (
          <p className="rounded-lg border border-black/10 bg-white p-4 text-sm text-foreground/60 shadow-sm dark:border-white/15 dark:bg-white/5">
            No links created yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <LinkListItem key={link.id} link={link} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
