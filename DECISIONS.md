# Decisions

## Which components are client components and why?

- The Dashboard component: it owns the optimistic state and polling logic so it must be a client component.
- The CopyButton component: it requires accessing the clipboard on the client.
- The Form component: it receives a client-side action and pending state from the Dashboard component.

## What polling interval did you pick for click counts, and why?

- Interval of 2 seconds was chosen as click count data may become stale if the page is not refreshed (i.e. link accessed in another tab).
- A 2 seconds interval felt like a good balance between responsiveness and simplicity for a small application.

## How does optimistic reconciliation work?

- When the form is submitted, Dashboard immediately adds a temporary pending link to the top of the list.
- If the server action succeeds, it returns the created link. Dashboard removes the temporary pending item and inserts the real link returned by the server.
- If the server action fails, the pending item is removed and the error message is shown to the user.
- Polling then keeps click counts and any later server changes up to date.

## What is one thing you would improve with more time?

- I would improve the short code generation by adding collision handling and a more robust generation strategy for production-scale usage.
- I would add a better pending UI that still allows rapid submissions, such as per-submission status instead of disabling the whole form.

## Further notes

- I kept the form value after submission so rapid consecutive submissions are easier to test and perform.
- A small artificial delay was added to link creation so optimistic updates and reconciliation behaviour are easier to observe during testing.
- I disabled browser URL validation so invalid submissions reach the server action and the server-side error path can be tested.
