import { getLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

export default function Home() {
  const links = getLinks();

  return (
    <main className="font-sans flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">Welcome Assignment</h1>
      <p className="text-sm text-foreground/70">
        SQLite is ready. Link count: {links.length}
      </p>
    </main>
  );
}
