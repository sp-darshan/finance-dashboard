# Finance Dashboard

Finance Dashboard is a React based frontend project. It demonstrates a clean finance UI, practical state management and a modular frontend architecture for tracking financial activity.

## Demo

- Live demo: https://finadas.vercel.app/

## Project Overview

This dashboard helps users understand their financial activity in one place. It brings together:

- a summary view of key financial totals,
- a transactions section for reviewing and managing ledger entries,
- an insights area for identifying spending patterns and monthly movement.

## Features

- Dashboard summary cards for balance, income and expenses.
- Balance trend chart showing a running cumulative balance.
- Category breakdown visualization for expense concentration.
- Transactions table with filtering, sorting and search.
- Role-based UI that simulates viewer and admin behavior.
- Insights section with spending trends, comparisons and useful observations.

## Tech Stack

- React: used for building the component-based user interface and page structure.
- Tailwind CSS: used for fast, consistent styling and responsive layout work.
- Zustand: used for lightweight shared state management so transactions, filters, selected role and theme can stay synchronized across the app without prop drilling.

## Architecture

- Component-based structure keeps the UI modular and easy to extend.
- UI and logic are separated through pages, reusable components, hooks, utilities and a central store.
- Zustand acts as the central source of truth for app wide state such as transactions, filters, role and theme.

## Key Design Decisions

- The balance chart uses a running cumulative balance to make financial progression easier to read.
- The dashboard combines trend, comparison and category charts to show different views of the same data.
- The UI is intentionally kept clean and readable so the data remains the focus.

## Setup Instructions

1. Clone the repository.
2. Install dependencies:

	```bash
	npm install
	```

3. Start the development server:

	```bash
	npm run dev
	```

## Future Improvements

- Backend integration for persistent remote storage and real user accounts.

## Project Structure

```text
.
|-- public/
`-- src/
	|-- api/
	|   `-- mockApi.js
	|-- assets/
	|-- components/
	|   |-- dashboard/
	|   |   |-- BalanceChart.jsx
	|   |   |-- CategoryChart.jsx
	|   |   `-- SummaryCard.jsx
	|   |-- insights/
	|   |   |-- MonthlyIncomeExpenseChart.jsx
	|   |   |-- SavingsTrendChart.jsx
	|   |   |-- SpendingTrendChart.jsx
	|   |   `-- TopSpendingCategoriesLeaderboard.jsx
	|   |-- layout/
	|   |   |-- Header.jsx
	|   |   |-- Layout.jsx
	|   |   `-- Sidebar.jsx
	|   |-- transactions/
	|   |   |-- Filters.jsx
	|   |   |-- TransactionForm.jsx
	|   |   |-- TransactionRow.jsx
	|   |   `-- TransactionTable.jsx
	|   `-- ui/
	|       |-- Button.jsx
	|       |-- Card.jsx
	|       |-- Input.jsx
	|       `-- Modal.jsx
	|-- constants/
	|   |-- categories.js
	|   `-- roles.js
	|-- data/
	|   `-- transactions.js
	|-- hooks/
	|   |-- useTheme.js
	|   `-- useTransactions.js
	|-- pages/
	|   |-- Dashboard.jsx
	|   |-- Insights.jsx
	|   `-- Transactions.jsx
	|-- store/
	|   `-- useFinanceStore.js
	|-- styles/
	|   `-- index.css
	`-- utils/
		|-- calculations.js
		|-- exporters.js
		`-- formatters.js
    |-- .gitignore
    |-- eslint.config.js
    |-- index.html
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- tailwind.config.js
    |-- vercel.json
    |-- vite.config.js
```