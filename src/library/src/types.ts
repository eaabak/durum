export type StateUpdater<T> = (state: T) => Partial<T> | T;

export type Listener<T> = (state: T) => void;

export type Middleware<T> = (
  set: (updater: StateUpdater<T>) => Promise<void>
) => (updater: StateUpdater<T>) => Promise<void>;

export type StoreInitializer<T> = (
  set: (updater: StateUpdater<T>) => Promise<void>,
  get: () => T
) => T;

export type UseStore<T> = () => [
  T,
  (updater: StateUpdater<T>) => Promise<void>
];

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}
