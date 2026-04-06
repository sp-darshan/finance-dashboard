import { createPortal } from 'react-dom';
import Button from './Button';
import { useTheme } from '../../hooks/useTheme';

export default function Modal({ open, title, children, onClose }) {
  const { isLight } = useTheme();

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm ${isLight ? 'bg-zinc-900/30' : 'bg-black/75'}`}>
      <div className={`w-full max-w-2xl rounded-[28px] border p-6 shadow-2xl ${isLight ? 'border-zinc-300 bg-white' : 'border-zinc-800 bg-(--panel)'}`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className={`text-xl font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{title}</h3>
          </div>
          <Button variant="ghost" onClick={onClose} type="button">
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}