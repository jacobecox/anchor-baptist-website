'use client'
import { useState, useEffect } from 'react';

export default function Notification({ 
  type, // 'success' or 'error'
  message, 
  title,
  isVisible, 
  onClose,
  autoClose = true,
  autoCloseDelay = 5000
}) {
  const [isShown, setIsShown] = useState(isVisible);

  useEffect(() => {
    setIsShown(isVisible);
    
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsShown(false);
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose]);

  if (!isShown) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-2 border-green-400 text-green-800',
          icon: 'text-green-600',
          iconPath: 'M5 13l4 4L19 7'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-2 border-red-400 text-red-800',
          icon: 'text-red-600',
          iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      default:
        return {
          container: 'bg-blue-50 border-2 border-blue-400 text-blue-800',
          icon: 'text-blue-600',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className={`p-6 rounded-lg shadow-lg ${styles.container}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <svg className={`w-8 h-8 ${styles.icon} mt-1 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={styles.iconPath}></path>
            </svg>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-lg">{message}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsShown(false);
              onClose();
            }}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 