import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const STYLES = {
  error: {
    container: 'bg-white border-l-4 border-red-500',
    icon: <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />,
    title: 'text-red-700',
    message: 'text-gray-500',
    bar: 'bg-red-500',
    close: 'hover:bg-red-50 text-gray-400 hover:text-red-500',
  },
  success: {
    container: 'bg-white border-l-4 border-bolt-green',
    icon: <CheckCircle size={20} className="text-bolt-green shrink-0 mt-0.5" />,
    title: 'text-green-700',
    message: 'text-gray-500',
    bar: 'bg-bolt-green',
    close: 'hover:bg-green-50 text-gray-400 hover:text-green-600',
  },
  warning: {
    container: 'bg-white border-l-4 border-yellow-400',
    icon: <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />,
    title: 'text-yellow-700',
    message: 'text-gray-500',
    bar: 'bg-yellow-400',
    close: 'hover:bg-yellow-50 text-gray-400 hover:text-yellow-600',
  },
  info: {
    container: 'bg-white border-l-4 border-blue-400',
    icon: <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />,
    title: 'text-blue-700',
    message: 'text-gray-500',
    bar: 'bg-blue-400',
    close: 'hover:bg-blue-50 text-gray-400 hover:text-blue-500',
  },
};

const NotificationItem = ({ notification, onDismiss }) => {
  const [progress, setProgress] = useState(100);
  const s = STYLES[notification.type] || STYLES.info;

  useEffect(() => {
    const duration = Number(notification.duration);
    if (!Number.isFinite(duration) || duration <= 0) {
      setProgress(0);
      return;
    }
    const step = 100 / (duration / 50);
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p - step;
        if (next <= 0) { clearInterval(interval); return 0; }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [notification.duration]);

  return (
    <div
      className={`
        relative w-80 rounded-xl shadow-lg overflow-hidden
        ${s.container}
        ${notification.exiting ? 'notification-exit' : 'notification-enter'}
      `}
    >
      {/* Contenu */}
      <div className="flex items-start gap-3 px-4 py-3.5 pr-10">
        {s.icon}
        <div className="flex-1 min-w-0">
          {notification.title && (
            <p className={`text-sm font-bold leading-snug ${s.title}`}>{notification.title}</p>
          )}
          {notification.message && (
            <p className={`text-xs mt-0.5 leading-relaxed ${s.message}`}>{notification.message}</p>
          )}
        </div>
      </div>

      {/* Bouton fermer */}
      <button
        onClick={() => onDismiss(notification.id)}
        className={`absolute top-2.5 right-2.5 p-1 rounded-full transition ${s.close}`}
        aria-label="Fermer"
      >
        <X size={14} />
      </button>

      {/* Barre de progression */}
      <div className="h-0.5 bg-gray-100">
        <div
          className={`h-full transition-all ease-linear ${s.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const NotificationStack = () => {
  const { notifications, dismiss } = useNotification();

  return (
    <div aria-live="polite" className="fixed top-4 left-4 z-[300] flex flex-col gap-2 pointer-events-none">
      {notifications.map(n => (
        <div key={n.id} className="pointer-events-auto">
          <NotificationItem notification={n} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  );
};

export default NotificationStack;
