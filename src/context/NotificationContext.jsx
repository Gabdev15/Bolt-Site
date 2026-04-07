import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const NotificationContext = createContext(null);

const EXIT_DELAY_MS = 300;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const timeoutsRef = useRef(new Map());

  const clearTimer = (key) => {
    const id = timeoutsRef.current.get(key);
    if (id !== undefined) { clearTimeout(id); timeoutsRef.current.delete(key); }
  };

  useEffect(() => {
    const timers = timeoutsRef.current;
    return () => timers.forEach(id => clearTimeout(id));
  }, []);

  const notify = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { id, type, title, message, duration, exiting: false }]);

    const exitKey = `exit-${id}`;
    const removeKey = `remove-${id}`;

    const exitId = setTimeout(() => {
      timeoutsRef.current.delete(exitKey);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, exiting: true } : n)
      );
      const removeId = setTimeout(() => {
        timeoutsRef.current.delete(removeKey);
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, EXIT_DELAY_MS);
      timeoutsRef.current.set(removeKey, removeId);
    }, duration);
    timeoutsRef.current.set(exitKey, exitId);
  }, []);

  const dismiss = useCallback((id) => {
    clearTimer(`exit-${id}`);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, exiting: true } : n)
    );
    const removeKey = `remove-${id}`;
    clearTimer(removeKey);
    const removeId = setTimeout(() => {
      timeoutsRef.current.delete(removeKey);
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, EXIT_DELAY_MS);
    timeoutsRef.current.set(removeKey, removeId);
  }, []);

  // Raccourcis pratiques
  const error   = useCallback((title, message, opts) => notify({ type: 'error',   title, message, ...opts }), [notify]);
  const success = useCallback((title, message, opts) => notify({ type: 'success', title, message, ...opts }), [notify]);
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
