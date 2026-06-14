# Apex Expense

## Table of Contents

- Overview
- Features
- Project Structure
- Getting Started
- Usage
- Running Tests
- Tech Stack
- License

---

## Overview

Apex Expense is a fully browser-based expense tracker that allows users to log daily expenses by description, amount, and category, view a running total, and filter records in real time. All data input are also stored in the  `localStorage` 

---

## Features

- **Add expenses** — Record an expense with a description, amount, and one of five categories: Food, Utilities, Entertainment, Transport, or Other.
- **Live total** — The total updates instantly whenever an expense is added, deleted, or the category filter changes.
- **Category filtering** — Filter the expense list by category without losing or mutating the underlying data.
- **Delete entries** — Remove any expense from the list using event delegation on the table body.
- **Data persistence** — Expenses survive page refreshes via `localStorage`. A new `Tracker` instance on load automatically reads saved data.
- **Responsive layout** — The two-column layout collapses gracefully to a single column on smaller screens.

---

## Project Structure

```
Expense-Tracker/
├── index.html        # Application shell — markup, layout, Tailwind CDN link
├── tracker.js        # Core logic — Expense class, Tracker class, DOM interaction
├── tracker.test.js   # Jest unit tests for the Tracker class
└── package.json      # Node project config, Jest setup, test script
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, or Safari)

## Installation
1. Clone the repository:

```bash
git clone https://github.com/JeromeJason-dev/Apex-Expense.git
cd apex-expense
```
2. Open the project: Simply open the index.html file in your preferred browser to view the current build.

### Installing Test Dependencies

```bash
npm install
```

This installs `jest` and `jest-environment-jsdom` as dev dependencies.

---

## Usage

### Adding an Expense

1. Enter a description in the **Description** field (e.g. "Lunch").
2. Enter the amount in the **Amount** field (e.g. `12.50`).
3. Select a category from the dropdown.
4. Click **Add Expense**.

The expense appears immediately in the table and the total updates.

### Filtering Expenses

Use the **Filter by** dropdown above the table to show only expenses from a specific category. The displayed total reflects only the filtered items — the underlying data is never modified.

### Deleting an Expense

Click the **Delete** button in the Action column next to any expense. The entry is removed and the total recalculates.

### Data Persistence

Expenses are saved to `localStorage` automatically after every add or delete. Refreshing or reopening the page restores all previous entries.

---

## Running Tests

```bash
npm test
```

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application shell and semantic markup |
| JavaScript | Core logic, DOM manipulation, class syntax, modules |
| Tailwind CSS (CDN) | Utility-first styling |
| Jest  | Unit testing framework |
| jest-environment-jsdom | Browser-like environment for Jest in Node |
| `localStorage` | Client-side data persistence |


## License

This project is licensed by the MIT license.