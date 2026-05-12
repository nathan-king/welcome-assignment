import Button from "@/components/Button";

type FormProps = {
  action: (formData: FormData) => void;
  isPending: boolean;
};

export default function Form({ action, isPending }: FormProps) {
  return (
    <>
      <form
        action={action}
        className="flex w-full max-w-xl flex-col gap-3 rounded-lg border border-black/10 bg-white p-4 shadow-sm sm:flex-row dark:border-white/15 dark:bg-white/5"
      >
        <label className="sr-only" htmlFor="originalUrl">
          URL to shorten
        </label>
        <input
          id="originalUrl"
          name="originalUrl"
          type="url"
          required
          placeholder="https://example.com"
          className="min-h-11 flex-1 rounded-md border border-black/15 bg-white px-4 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-white/20 dark:bg-black/20 dark:text-white dark:focus:border-white dark:focus:ring-white/15"
        />
        <Button type="submit" aria-busy={isPending}>
          Shorten URL
        </Button>
      </form>
      <p className="max-w-xl text-xs text-foreground/55">
        Paste a full URL and submit it to create a short link.
      </p>
    </>
  );
}
