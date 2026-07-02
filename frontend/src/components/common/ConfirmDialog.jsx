import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) {
  return (
    <Transition show={open}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl ${variant === 'danger' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-amber-50 dark:bg-amber-900/30'}`}>
                  <AlertTriangle className={variant === 'danger' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'} size={22} />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-base font-semibold text-slate-900 dark:text-white">
                    {title}
                  </DialogTitle>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                    {message}
                  </p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 text-sm font-semibold text-white rounded-xl transition ${
                    variant === 'danger'
                      ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25'
                      : 'bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/25'
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
