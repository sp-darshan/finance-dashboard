import { useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { CATEGORIES } from '../../constants/categories';

const initialState = {
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
};

export default function TransactionForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Save transaction',
  categories,
  onAddCategory,
  onRemoveCategory,
}) {
  const [formState, setFormState] = useState(() => initialData ?? initialState);
  const [newCategory, setNewCategory] = useState('');

  const categoryOptions = useMemo(() => categories ?? [], [categories]);
  const builtInCategoryNames = useMemo(() => CATEGORIES.map((category) => category.name), []);
  const customCategories = useMemo(
    () => categoryOptions.filter((category) => !builtInCategoryNames.includes(category)),
    [builtInCategoryNames, categoryOptions],
  );

  const handleAddCategory = () => {
    const nextCategory = newCategory.trim();

    if (!nextCategory || !onAddCategory) {
      return;
    }

    const added = onAddCategory(nextCategory);

    if (added) {
      setFormState((current) => ({ ...current, category: nextCategory }));
      setNewCategory('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
    setFormState(initialState);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input label="Description" value={formState.description} onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))} required />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Amount" type="number" min="0" step="0.01" value={formState.amount} onChange={(event) => setFormState((current) => ({ ...current, amount: event.target.value }))} required />
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          <span>Type</span>
          <select className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100" value={formState.type} onChange={(event) => setFormState((current) => ({ ...current, type: event.target.value }))}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          <span>Category</span>
          <select className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100" value={formState.category} onChange={(event) => setFormState((current) => ({ ...current, category: event.target.value }))}>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm font-medium text-zinc-200">Add a new category</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            label="Category name"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="e.g. Subscriptions"
          />
          <div className="flex items-end">
            <Button type="button" variant="secondary" onClick={handleAddCategory}>
              Add category
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Custom categories</p>
          {customCategories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {customCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                >
                  {category}
                  {onRemoveCategory && (
                    <button
                      type="button"
                      aria-label={`Delete ${category}`}
                      className="text-rose-400 transition hover:text-rose-300"
                      onClick={() => onRemoveCategory(category)}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400">No custom categories added yet.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}