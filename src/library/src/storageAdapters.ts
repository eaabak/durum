import { StorageAdapter } from "./types";

export const LocalStorageAdapter: StorageAdapter = {
  getItem: async (key) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },
  setItem: async (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
  removeItem: async (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

export const SessionStorageAdapter: StorageAdapter = {
  getItem: async (key) => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(key);
  },
  setItem: async (key, value) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, value);
    }
  },
  removeItem: async (key) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
  },
};

export const ServerStorageAdapter: StorageAdapter = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};
