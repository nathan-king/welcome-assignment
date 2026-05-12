import "server-only";

import { db } from "@/lib/db";

export type Link = {
  id: number;
  code: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
};

type LinkRow = {
  id: number;
  code: string;
  original_url: string;
  click_count: number;
  created_at: string;
};

function mapLinkRow(row: LinkRow): Link {
  return {
    id: row.id,
    code: row.code,
    originalUrl: row.original_url,
    clickCount: row.click_count,
    createdAt: row.created_at,
  };
}

export function getLinks(): Link[] {
  const rows = db
    .prepare(
      `
        SELECT id, code, original_url, click_count, created_at
        FROM links
        ORDER BY created_at DESC, id DESC
      `,
    )
    .all() as LinkRow[];

  return rows.map(mapLinkRow);
}

export function getLinkByCode(code: string): Link | null {
  const row = db
    .prepare(
      `
        SELECT id, code, original_url, click_count, created_at
        FROM links
        WHERE code = ?
      `,
    )
    .get(code) as LinkRow | undefined;

  return row ? mapLinkRow(row) : null;
}

export function createLink(code: string, originalUrl: string): Link {
  db.prepare(
    `
      INSERT INTO links (code, original_url)
      VALUES (?, ?)
    `,
  ).run(code, originalUrl);

  const link = getLinkByCode(code);

  if (!link) {
    throw new Error("Failed to create link");
  }

  return link;
}

export function incrementClickCount(code: string): void {
  db.prepare(
    `
      UPDATE links
      SET click_count = click_count + 1
      WHERE code = ?
    `,
  ).run(code);
}
