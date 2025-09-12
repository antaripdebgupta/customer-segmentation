'use client';

import { toast } from 'sonner';

export default function ConfirmToast({
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
}) {
  return toast(
    (t) => (
      <div className="flex flex-col space-y-2">
        <p className="font-medium">{message}</p>
        <div className="flex space-x-2">
          <button
            onClick={async () => {
              toast.dismiss(t);
              if (onConfirm) await onConfirm();
            }}
            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      position: 'top-center',
    }
  );
}
