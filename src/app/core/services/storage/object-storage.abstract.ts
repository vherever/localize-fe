import { ObjectStorageModel } from './object-storage.model';

export abstract class ObjectStorageAbstract implements ObjectStorageModel {
  protected constructor(
    private storage: Storage,
  ) {}

  setItem<T>(key: string, data: T): void {
    this.storage.setItem(key, JSON.stringify(data));
  }

  getItem<T>(key: string): T {
    return JSON.parse(this.storage.getItem(key));
  }

  updateItem<T>(key: string, data: object): void {
    const item = JSON.parse(this.storage.getItem(key));
    this.storage.setItem(key, JSON.stringify({item, ...data}));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  key(index: number): any {
    return this.storage.key(index);
  }
}
