# Finance Dashboard

Frontend-only finance dashboard built with React, Vite, Tailwind CSS, Framer Motion and Zustand.

## Project Structure

```text
.
|-- public/
|-- src/
|   |-- assets/
|   |   |-- hero.png
|   |   |-- react.svg
|   |   `-- vite.svg
|   |-- components/
|   |   |-- dashboard/
|   |   |   |-- BalanceChart.jsx
|   |   |   |-- CategoryChart.jsx
|   |   |   `-- SummaryCard.jsx
|   |   |-- insights/
|   |   |   |-- InsightCard.jsx
|   |   |   |-- InsightsPanel.jsx
|   |   |   |-- MonthlyIncomeExpenseChart.jsx
|   |   |   |-- SpendingTrendChart.jsx
|   |   |   `-- TopSpendingCategoriesLeaderboard.jsx
|   |   |-- layout/
|   |   |   |-- Header.jsx
|   |   |   |-- Layout.jsx
|   |   |   `-- Sidebar.jsx
|   |   |-- transactions/
|   |   |   |-- Filters.jsx
|   |   |   |-- TransactionForm.jsx
|   |   |   |-- TransactionRow.jsx
|   |   |   `-- TransactionTable.jsx
|   |   `-- ui/
|   |       |-- Button.jsx
|   |       |-- Card.jsx
|   |       |-- Input.jsx
|   |       `-- Modal.jsx
|   |-- constants/
|   |   |-- categories.js
|   |   `-- roles.js
|   |-- context/
|   |-- data/
|   |   `-- transactions.js
|   |-- hooks/
|   |   |-- useFilters.js
|   |   `-- useTransactions.js
|   |-- pages/
|   |   |-- Dashboard.jsx
|   |   |-- Insights.jsx
|   |   `-- Transactions.jsx
|   |-- store/
|   |   `-- useFinanceStore.js
|   |-- styles/
|   |   `-- index.css
|   |-- utils/
|   |   |-- calculations.js
|   |   `-- formatters.js
|   |-- App.jsx
|   |-- main.jsx
|   `-- routes.jsx
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- tailwind.config.js
`-- vite.config.js
```