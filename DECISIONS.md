# Decisions

## Which components are client components and why?

- The Dashboard component: it owns the optimistic state and polling logic so it must be a client component.
- The CopyButton component: it requires accessing the clipboard on the client.
- The Form component: it receives the client-side action, ref and pending state from the Dashboard component.

## What polling interval did you pick for click counts, and why?

- Interval of 2 seconds was chosen as click count data may become stale if the page is not refreshed (i.e. link accessed in another tab). 2 seconds felt like a good balance between responsiveness and simplicity for a small application.

## How does optimistic reconciliation work?

## What is one thing you would improve with more time?
