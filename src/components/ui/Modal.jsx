import { createPortal } from 'react-dom';
import Button from './Button';

export default function Modal({ open, title, children, onClose }) {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-zinc-800 bg-[color:var(--panel)] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
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