'use client'
import { useState, useEffect } from 'react';

export default function ConfirmationDialog({ 
  isVisible,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // 'warning', 'danger', 'info'
  onConfirm,
  onCancel
}) {
  const [isShown, setIsShown] = useState(isVisible);

  useEffect(() => {
    setIsShown(isVisible);
  }, [isVisible]);

  if (!isShown) return null;

  const getStyles = () => {
    switch (type) {
      case 'danger':
        return {
          container: 'bg-red-50 border-2 border-red-400',
          icon: 'text-red-600',
          iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
          cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-2 border-yellow-400',
          icon: 'text-yellow-600',
          iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
          cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
        };
      default:
        return {
          container: 'bg-blue-50 border-2 border-blue-400',
          icon: 'text-blue-600',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
          cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
        };
    }
  };

  const styles = getStyles();

  const handleConfirm = () => {
    setIsShown(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsShown(false);
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`p-6 rounded-lg shadow-lg max-w-md w-full ${styles.container}`}>
        <div className="flex items-start space-x-3 mb-4">
          <svg className={`w-8 h-8 ${styles.icon} mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={styles.iconPath}></path>
          </svg>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-lg">{message}</p>
          </div>
        </div>
        
        <div className="flex space-x-3 justify-end">
          <button
            onClick={handleCancel}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${styles.cancelButton}`}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${styles.confirmButton}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
} 