/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseStore, StateUpdater } from "./types";
import { useEffect } from "react";
import { create, globalStores } from "./createStore";

export const createSnapshotSupport = <T>(
  useStore: () => [T, (updater: StateUpdater<T>) => Promise<void>]
) => {
  const snapshots: T[] = [];

  const useGetSnapshot = () => {
    const [state] = useStore();
    snapshots.push({ ...state });
  };

  const useRestoreSnapshot = () => {
    const [, setState] = useStore();
    const restore = () => {
      const snapshot = snapshots.pop();
      if (snapshot) {
        setState(() => ({ ...snapshot }));
      }
    };
    return restore;
  };

  return { useGetSnapshot, useRestoreSnapshot };
};

export const useSelector = <T, R extends T = T>(
  storeName: string,
  selector?: (state: T) => R
): [R, (updater: StateUpdater<T>) => Promise<void>] => {
  const storeEntry = globalStores.find(
    (entry: any) => entry.storeName === storeName
  );

  if (!storeEntry) {
    throw new Error(`Store with name "${storeName}" not found.`);
  }

  const [state, setState] = storeEntry.store() as [
    T,
    (updater: StateUpdater<T>) => Promise<void>
  ];

  const selectedState = selector ? selector(state) : (state as R);

  return [selectedState, setState];
};

export const createResettableStore = <T extends Record<string, unknown>>(
  initializer: (set: (updater: StateUpdater<T>) => Promise<void>) => T,
  middlewares: ((
    set: (updater: StateUpdater<T>) => Promise<void>
  ) => (updater: StateUpdater<T>) => Promise<void>)[] = [],
  storeName: string
): (() => [T, (updater: StateUpdater<T>) => Promise<void>]) & {
  useReset: () => void;
} => {
  let initialState: T;

  const useStore = create<T>(
    (set) => {
      initialState = initializer(set);
      return initialState;
    },
    middlewares,
    storeName
  );

  const useReset = () => {
    const { setState } = useStore();
    setState(() => ({ ...initialState }));
  };

  return Object.assign(
    () =>
      useStore() as unknown as [T, (updater: StateUpdater<T>) => Promise<void>],
    {
      useReset,
    }
  );
};

export const useOnStateChange = <T>(
  useStore: UseStore<T>,
  callback: (state: T) => void
) => {
  const [state] = useStore();
  useEffect(() => {
    callback(state);
  }, [callback, state]);
};
