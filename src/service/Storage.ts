import localforage from "localforage";
import { nanoid } from "nanoid";

export class StorageService {
  async saveData<T>(key: string, data: T) {
    try {
      await localforage.setItem(key, data);
    } catch (error) {
      console.error(`Error saving data to local storage: ${error}`);
    }
  }

  async loadData<T>(key: string): Promise<T | null> {
    try {
      const storedData = await localforage.getItem<T>(key);
      return storedData || null;
    } catch (error) {
      console.error(`Error fetching data from local storage: ${error}`);
      return null;
    }
  }

  generateUniqueKey(): string {
    return nanoid();
  }
}
