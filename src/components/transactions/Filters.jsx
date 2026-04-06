import Card from '../ui/Card';
import Input from '../ui/Input';
import { TRANSACTION_TYPES } from '../../constants/categories';
import { useTheme } from '../../hooks/useTheme';

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Date (newest first)' },
  { value: 'date-asc', label: 'Date (oldest first)' },
  { value: 'amount-desc', label: 'Amount (high to low)' },
  { value: 'amount-asc', label: 'Amount (low to high)' },
  { value: 'category-asc', label: 'Category (A-Z)' },
];

const GROUP_OPTIONS = [
  { value: 'none', label: 'No grouping' },
  { value: 'month', label: 'Group by month' },
  { value: 'type', label: 'Group by type' },
  { value: 'category', label: 'Group by category' },
];

export default function Filters({ filters, categories, onChange, onReset }) {
  const { isLight } = useTheme();
  const selectClassName = `rounded-2xl border px-4 py-3 ${isLight ? 'border-zinc-300 bg-white text-zinc-900' : 'border-zinc-800 bg-zinc-950/70 text-zinc-100'}`;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>Filters</h2>
          <p className="text-sm text-zinc-600">Narrow the table by type, category, and date.</p>
        </div>
        <button
          className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${isLight ? 'border-zinc-300 bg-zinc-100 text-zinc-700 hover:bg-zinc-200' : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'}`}
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Input label="Search" value={filters.search} onChange={(event) => onChange({ search: event.target.value })} placeholder="Merchant, note, category" />
        <label className={`grid gap-2 text-sm font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
          <span>Type</span>
          <select className={selectClassName} value={filters.type} onChange={(event) => onChange({ type: event.target.value })}>
            <option value="all">All</option>
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className={`grid gap-2 text-sm font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
          <span>Category</span>
          <select className={selectClassName} value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <Input label="Start date" type="date" value={filters.startDate} onChange={(event) => onChange({ startDate: event.target.value })} />
        <Input label="End date" type="date" value={filters.endDate} onChange={(event) => onChange({ endDate: event.target.value })} />
        <label className={`grid gap-2 text-sm font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
          <span>Sort by</span>
          <select className={selectClassName} value={filters.sortBy} onChange={(event) => onChange({ sortBy: event.target.value })}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className={`grid gap-2 text-sm font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
          <span>Group by</span>
          <select className={selectClassName} value={filters.groupBy} onChange={(event) => onChange({ groupBy: event.target.value })}>
            {GROUP_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
    </Card>
  );
}