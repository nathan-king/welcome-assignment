import Button from "@/components/Button";
import Form from "@/components/Form";
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

      <section>
        <h2>Links</h2>

        {links.length === 0 ? (
          <p>No links created yet.</p>
        ) : (
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <p>
                  Shortened URL: /{link.code} <Button size="small">Copy</Button>
                </p>
                <p>Original URL: {link.originalUrl}</p>
                <p>Visit count: {link.clickCount}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
