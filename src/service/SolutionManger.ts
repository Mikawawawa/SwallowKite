"use client";
import localforage from "localforage";
import { useEffect, useState } from "react";

export interface ObjectItem {
  key: number;
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

    // Load data from local storage
  }

  private generateUniqueKey(): number {
    // Generate a unique key based on the current timestamp
    return new Date().getTime();
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
  removeItem(key: number) {
    this.data = this.data.filter((item) => item.key !== key);
    this.saveData();
  }

  updateItem(key: number, name: string) {
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

  const removeItem = async (key: number) => {
    await solutionManager.removeItem(key);
    setData([...solutionManager.getData()]); // Update the state with the new data
  };

  const updateItem = async (key: number, name: string) => {
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
