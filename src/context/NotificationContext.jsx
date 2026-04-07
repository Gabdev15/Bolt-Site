import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { id, type, title, message, duration, exiting: false }]);

    setTimeout(() => {
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, exiting: true } : n)
      );
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 300);
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, exiting: true } : n)
    );
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 300);
  }, []);

  // Raccourcis pratiques
  const error   = useCallback((title, message, opts) => notify({ type: 'error',   title, message, ...opts }), [notify]);
  const success = useCallback((title, message, opts) => notify({ type: 'success', title, message, ...opts }));
  const warning = useCallback((title, message, opts) => notify({ type: 'warning', title, message, ...opts }), [notify]);
  const info    = useCallback((title, message, opts) => notify({ type: 'info',    title, message, ...opts }), [notify]);

  return (
    <NotificationContext.Provider value={{ notify, error, success, warning, info, notifications, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};
