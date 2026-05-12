# Decisions

## Which components are client components and why?

- The Dashboard component: it owns the optimistic state and polling logic so it must be a client component.
- The CopyButton component: it requires accessing the clipboard on the client.
- The Form component: it receives the client-side action, ref and pending state from the Dashboard component.

## What polling interval did you pick for click counts, and why?

- Interval of 2 seconds was chosen as click count data may become stale if the page is not refreshed (i.e. link accessed in another tab). 2 seconds felt like a good balance between responsiveness and simplicity for a small application.

## How does optimistic reconciliation work?

- When the form is submitted, Dashboard immediately adds a temporary pending link to the top of the list.
- If the server action succeeds, polling refreshes the list from SQLite and replaces the pending item with the real saved link.
- If the server action fails, the pending item is removed and the error message is shown to the user.

## What is one thing you would improve with more time?

- I would improve the short code generation by adding collision handling and a more robust generation strategy for production-scale usage.
