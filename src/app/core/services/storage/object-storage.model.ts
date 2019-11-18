export interface ObjectStorageModel {
  setItem<T>(key: string, data: T): void;

  getItem<T>(key: string): T;

  updateItem<T>(key: string, data: object): void;

  removeItem(key: string): void;

  clear(): void;

  key(index: number): any;
}
