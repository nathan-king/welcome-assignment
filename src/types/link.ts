export type Link = {
  id: string | number;
  code: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
  isPending?: boolean;
};
