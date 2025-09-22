import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  /**
   * Controls the visibility of the modal. If `true`, the modal is open; otherwise, it's closed.
   */
  isOpen: boolean;
  /**
   * Callback function to be invoked when the modal needs to be closed, e.g., by clicking the close button or overlay.
   */
  onClose: () => void;
  /**
   * The title displayed at the top of the modal.
   */
  title: string;
  /**
   * The content to be rendered inside the modal body.
   */
  children: React.ReactNode;
}

/**
 * `Modal` is a reusable React functional component that displays a dialog box
 * on top of the current page content. It provides a title, a close button,
 * and renders its children within the modal body.
 *
 * @param {ModalProps} props - The properties for the component.
 * @returns {JSX.Element | null} The Modal component if `isOpen` is true, otherwise `null`.
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}