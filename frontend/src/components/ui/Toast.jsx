import React from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  const types = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600',
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${types[type]} text-white px-6 py-4 rounded-lg shadow-lg fixed bottom-4 right-4`}>
      {message}
    </div>
  );
}
