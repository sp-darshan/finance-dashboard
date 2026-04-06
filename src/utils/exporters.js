const escapeCsv = (value) => {
  const stringValue = String(value ?? '');
  const escaped = stringValue.replaceAll('"', '""');

  return `"${escaped}"`;
};

const downloadBlob = (content, mimeType, filename) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
};

export const exportTransactionsToCsv = (transactions, filename = 'transactions-export.csv') => {
  const header = ['id', 'date', 'type', 'category', 'amount', 'description'];
  const rows = transactions.map((transaction) => [
    transaction.id,
    transaction.date,
    transaction.type,
    transaction.category,
    transaction.amount,
    transaction.description,
  ]);
  const csvContent = [header, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');

  downloadBlob(csvContent, 'text/csv;charset=utf-8', filename);
};

export const exportTransactionsToJson = (transactions, filename = 'transactions-export.json') => {
  const jsonContent = JSON.stringify(transactions, null, 2);

  downloadBlob(jsonContent, 'application/json;charset=utf-8', filename);
};
