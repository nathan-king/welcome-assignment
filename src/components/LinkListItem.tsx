import CopyButton from "@/components/CopyButton";
import type { Link as LinkData } from "@/lib/links";
import NextLink from "next/link";

type LinkListItemProps = {
  link: LinkData;
};

export default function LinkListItem({ link }: LinkListItemProps) {
  return (
    <li className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-4 shadow-sm dark:border-white/15 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[1fr_2fr_auto] sm:items-center">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase text-foreground/50">
            Shortened URL
          </p>
          <NextLink
            href={`/${link.code}`}
            className="block truncate text-sm font-medium underline-offset-4 hover:underline"
          >
            /{link.code}
          </NextLink>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase text-foreground/50">
            Original URL
          </p>
          <p className="truncate text-sm text-foreground/80">
            {link.originalUrl}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase text-foreground/50">
            Clicks
          </p>
          <p className="text-sm font-medium">{link.clickCount}</p>
        </div>
      </div>

      <div className="flex justify-end sm:ml-8">
        <CopyButton value={`https://localhost:3000/${link.code}`} />
      </div>
    </li>
  );
}
