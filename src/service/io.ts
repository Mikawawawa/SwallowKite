import localforage from "localforage";

export class IO {
  // 将 JSON 数据保存到 IndexedDB
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
