export const storageManager = {
  set(key, value, ttl = null) {
    const item = {
      value,
      expiresAt: ttl ? Date.now() + ttl : null,
    };

    localStorage.setItem(key, JSON.stringify(item));
  },

  get(key) {
    const storedItem = localStorage.getItem(key);

    if (!storedItem) {
      return null;
    }

    const item = JSON.parse(storedItem);

    if (item.expiresAt && Date.now() >= item.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  },

  delete(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
