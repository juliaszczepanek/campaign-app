export const getFromStorage = (key, fallbackValue) => {
    const stored = localStorage.getItem(key);
    try {
      return stored ? JSON.parse(stored) : fallbackValue;
    } catch {
      return fallbackValue;
    }
  };
  
  export const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const removeFromStorage = (key) => {
    localStorage.removeItem(key);
  };