"use client";
import localforage from "localforage";
import { useEffect, useState } from "react";

export interface ObjectItem {
  key: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export class SolutionManager {
  private storageKey: string;
  private data: ObjectItem[];

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.data = [];
  }

  private generateUniqueKey(): string {
    // Generate a unique key based on the current timestamp
    return window.btoa(Date.now().toString());
  }

  async loadData() {
    try {
      const storedData = await localforage.getItem<ObjectItem[]>(
        this.storageKey
      );
      if (storedData) {
        this.data = storedData;
      }
    } catch (error) {
      console.error("Error fetching data from local storage:", error);
    }
  }

  private async saveData() {
    try {
      await localforage.setItem(this.storageKey, this.data);
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }

  addItem(item?: Partial<ObjectItem>) {
    // Generate a unique key if not provided
    const newItem: ObjectItem = {
      key: item?.key || this.generateUniqueKey(),
      name: item?.name || `Untitled`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.data = [...this.data, newItem];
    this.saveData();
  }
  removeItem(key: string) {
    this.data = this.data.filter((item) => item.key !== key);
    this.saveData();
  }

  updateItem(key: string, name: string) {
    this.data = this.data.map((item) =>
      item.key === key ? { ...item, name: name, updatedAt: Date.now() } : item
    );
    this.saveData();
  }

  reorderItems(newData: ObjectItem[]) {
    this.data = newData;
    this.saveData();
  }

  getData(): ObjectItem[] {
    return this.data;
  }

  static save = async (key: string, data: Record<string, any>) => {
    try {
      await localforage.setItem(key, data);
      console.log(`JSON data saved to IndexedDB with key: ${key}`);
    } catch (error) {
      console.error("Error saving JSON data to IndexedDB:", error);
    }
  };

  // 从 IndexedDB 中获取保存的 JSON 数据
  static get = async (key: string) => {
    try {
      const jsonData = await localforage.getItem(key);
      console.log(`JSON data retrieved from IndexedDB with key: ${key}`);
      return jsonData;
    } catch (error) {
      console.error("Error retrieving JSON data from IndexedDB:", error);
      return null;
    }
  };
}

export const useSolutionStorage = (storageKey: string) => {
  const [solutionManager] = useState(() => new SolutionManager(storageKey));
  const [data, setData] = useState<ObjectItem[]>(solutionManager.getData());

  const [inited, setInited] = useState(false);

  useEffect(() => {
    const updateData = () => {
      setData(solutionManager.getData());
      setInited(true);
    };

    solutionManager.loadData().then(updateData);

    return () => {
      // Cleanup
    };
  }, [solutionManager]);

  const addItem = async (item: ObjectItem) => {
    await solutionManager.addItem(item);
    setData([...solutionManager.getData()]); // Update the state with the new data
  };

  const removeItem = async (key: string) => {
    await solutionManager.removeItem(key);
    setData([...solutionManager.getData()]); // Update the state with the new data
  };

  const updateItem = async (key: string, name: string) => {
    await solutionManager.updateItem(key, name);
    setData([...solutionManager.getData()]); // Update the state with the new data
  };

  const reorderItems = async (newData: ObjectItem[]) => {
    await solutionManager.reorderItems(newData);
    setData([...solutionManager.getData()]); // Update the state with the new data
  };

  return {
    data,
    addItem,
    removeItem,
    updateItem,
    reorderItems,
    inited,
  };
};
