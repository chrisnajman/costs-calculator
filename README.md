---
permalink: /index.html
---

[Website (Git Pages)](https://chrisnajman.github.io/costs-calculator)

# Costs Calculator

## Description

A simple calculator that tracks how much you spend per day over a number of days. An average spend is given for the period.

Add a date (required). I'd recommend that you do this every day - even on the days you don't spend anything - in order to get an accurate average.

If you haven't spent anything, just add the date, then submit the form.

- If you try to submit a blank field in either of the number fields, you'll get an alert popup.
- You cannot submit the form without specifying a date.

Additionally, you can:

- delete an entry,
- drag and drop an entry.

This is so that:

- if you make a mistake, you can delete and start again, and
- if you forget a day, you can make a new entry then drag and drop it to the correct position.

Note: I'm using the GBP pound symbol, but the calculator will work for any decimal-based currency.

## HTML

- `template` used for dynamic (`table`) rows.

The 'results' table container:

- has a `max-height`. When this is reached, vertical scrollbars appear.
- The results table container will start to scroll horizontally at around 420px width.

The 'results' table has a 'sticky' thead, so the table headers (`th`s) will always be on top when scrolling.

## Javascript

- ES6 (no transpilation to ES5)
- Data is saved to local storage

## CSS

- `grid` used for page layout.
- `flexbox` used for page elements.
- Responsive.

## Testing

- Tested on:
  - Windows 10
    - Chrome
    - Firefox
    - Microsoft Edge
