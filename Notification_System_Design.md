# Stage 1

## Priority Notification Approach

The notification API returns a list of campus notices with `ID`, `Type`, `Message`, and `Timestamp`.
For the priority inbox, I assign a simple weight to each notification type:

```js
Placement = 3
Result = 2
Event = 1
```

The list is sorted in two steps:

1. Higher weight first, so Placement notices appear before Result and Event notices.
2. If two notifications have the same weight, the newer `Timestamp` comes first.

This gives the required order:

```text
Placement > Result > Event
```

## Top N Selection

After sorting, the application takes only the first `n` notifications:

```js
sortByPriority(notifications).slice(0, n)
```

The frontend lets the user choose `Top 10`, `Top 15`, or `Top 20`.

## Handling New Notifications Efficiently

For the current API size, sorting the returned list in the browser is simple and reliable.
If the notification volume grows, the same approach can be improved by maintaining a small priority heap of size `n`.
Each new notification would be compared against the lowest ranked item currently in the heap.
That keeps the top `n` list updated without sorting the full dataset every time.

## Read And Unread Tracking

The frontend stores viewed notification IDs in localStorage under:

```text
viewedNotifications
```

When a student opens a notification, its `ID` is saved. The priority page uses unread notifications first, so already viewed notices do not keep occupying the top priority slots.

## Logging Middleware Usage

The reusable `Log(stack, level, package, message)` function is used for:

- application startup
- notification API fetch start
- successful notification fetch
- API errors
- filter changes
- priority page opening

All log calls use lower-case values required by the test server, for example:

```js
Log("frontend", "info", "api", "Fetching notifications");
```
