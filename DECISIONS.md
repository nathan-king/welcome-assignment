# Which components are client components and why?

- The CopyButton component: it requires accessing the clipboard on the client.
- The form: it owns the optimistic state so it must be a client component.
