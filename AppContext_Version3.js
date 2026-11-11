import React, { createContext, useRef, useState } from 'react';

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [isSaving, setIsSaving] = useState(false);
  const saveTimer = useRef(null);

  function updateTheme(nextTheme) {
    // Update shared state immediately so all tabs reflect the change.
    setTheme(nextTheme);
    setIsSaving(true);

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    saveTimer.current = setTimeout(() => {
      setIsSaving(false);
      saveTimer.current = null;
    }, 1000);
  }

  return (
    <AppContext.Provider value={{ theme, isSaving, updateTheme }}>
      {children}
    </AppContext.Provider>
  );
}