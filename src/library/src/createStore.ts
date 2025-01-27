/* eslint-disable @typescript-eslint/no-explicit-any */

import { Middleware, StoreInitializer, StateUpdater, Listener } from "./types";
import { useSyncExternalStore } from "react";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: {
      send<T extends Record<string, any>>(action: string, state: T): unknown;
      connect: (options: { name: string }) => {
        init: (state: unknown) => void;
        send: (action: string, state: unknown) => void;
      };
    };
  }
}

/**
 * A global registry to store and track all defined state stores.
 */
export const globalStores: {
  storeName: string;
  store: () => any;
}[] = [];

/**
 * Keeps a log of all state updates for each registered store.
 */
export const logData: { [key: string]: any[] } = {};

/**
 * A set of global listeners triggered on any store update.
 */
const updateListeners: Set<() => void> = new Set();

/**
 * Registers a new store in the global store registry.
 *
 * @template T - The type of the store state.
 * @param store - A function returning the current state of the store.
 * @param storeName - The name of the store to be registered.
 */
const registerStore = <T>(store: () => T, storeName: string): void => {
  globalStores.push({ storeName, store });
  logData[storeName] = [];
};

/**
 * Retrieves the latest state for all registered stores along with their names.
 *
 * @returns An object containing the state of all registered stores.
 */
export function getLogs(): { [key: string]: any } {
  return Object.fromEntries(
    globalStores.map(({ storeName, store }) => {
      const state = store();
      return [storeName, state];
    })
  );
}

/**
 * Creates a new store with state management and middleware support.
 *
 * @template T - The type of the store state.
 * @param initializer - A function to initialize the store state and provide state management methods.
 * @param middlewares - An optional array of middleware functions to enhance state updates.
 * @param storeName - A unique name for the store.
 * @returns A React hook that provides access to the store state and the `setState` function.
 */
export const create = <T extends Record<string, any>>(
  initializer: StoreInitializer<T>,
  middlewares: Middleware<T>[] = [],
  storeName: string
): (() => T & { setState: (updater: StateUpdater<T>) => Promise<void> }) => {
  let state: T = initializer(
    async (update) => {
      const updatedState =
        typeof update === "function" ? update(state) : update;
      await updateState(updatedState);
    },
    () => state
  );

  const listeners = new Set<Listener<T>>();

  const devtoolsExtension = window?.__REDUX_DEVTOOLS_EXTENSION__;
  if (!devtoolsExtension) {
    console.warn("Redux DevTools extension is not available.");
  } else {
    devtoolsExtension.send("Initial State", state);
  }

  /**
   * Retrieves the current state of the store.
   *
   * @returns The current state of the store.
   */
  const getState = (): T => state;

  /**
   * Subscribes a listener function to state updates.
   *
   * @param listener - A function to be invoked on every state update.
   * @returns A function to unsubscribe the listener.
   */
  const subscribe = (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  /**
   * Updates the state and notifies all listeners. Logs the new state and integrates with Redux DevTools.
   *
   * @param newState - A partial state object to merge with the current state.
   * @returns A promise that resolves when the update is complete.
   */
  const updateState = async (newState: Partial<T>): Promise<void> => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(state));
    logData[storeName].push({ ...state });
    updateListeners.forEach((listener) => listener());

    if (devtoolsExtension) {
      devtoolsExtension.send(`${storeName} update`, state);
    }
  };

  /**
   * Updates the state with middleware support.
   *
   * @param updater - A function or object to update the state.
   * @returns A promise that resolves when the update is complete.
   */
  const setState = middlewares.reduce(
    (acc, middleware) => middleware(acc),
    async (updater: StateUpdater<T>): Promise<void> => {
      const updatedState =
        typeof updater === "function" ? updater(state) : updater;
      await updateState(updatedState);
    }
  );

  /**
   * React hook to access the store's state and `setState` function.
   *
   * @returns An object containing the store's state and `setState`.
   */
  const useStore = (): T & {
    setState: (updater: StateUpdater<T>) => Promise<void>;
  } => {
    const currentState = useSyncExternalStore(subscribe, getState);
    return {
      ...currentState,
      setState,
    };
  };

  // Register the store globally for debugging and logging.
  registerStore(useStore, storeName);

  return useStore;
};
