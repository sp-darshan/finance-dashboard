import Card from '../ui/Card';
import Input from '../ui/Input';
import { TRANSACTION_TYPES } from '../../constants/categories';

export default function Filters({ filters, categories, onChange, onReset }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <p className="text-sm text-zinc-400">Narrow the table by type, category, and date.</p>
        </div>
        <button className="text-sm font-medium text-zinc-300 hover:text-white" onClick={onReset} type="button">
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Input label="Search" value={filters.search} onChange={(event) => onChange({ search: event.target.value })} placeholder="Merchant, note, category" />
        <label className="grid gap-2 text-sm font-medium text-zinc-200">
          <span>Type</span>
          <select className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-zinc-100" value={filters.type} onChange={(event) => onChange({ type: event.target.value })}>
            <option value="all">All</option>
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-200">
          <span>Category</span>
          <select className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-zinc-100" value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <Input label="Start date" type="date" value={filters.startDate} onChange={(event) => onChange({ startDate: event.target.value })} />
        <Input label="End date" type="date" value={filters.endDate} onChange={(event) => onChange({ endDate: event.target.value })} />
      </div>
    </Card>
  );
}