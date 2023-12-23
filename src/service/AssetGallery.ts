import localforage from "localforage";
import { StorageService } from "./Storage";

export interface ImageItem {
  key: string;
  source: string;
  name: string;
}

export const emptyImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export class ImageStorageManager extends StorageService {
  private listKey: string;

  constructor(namespace: string) {
    super();
    this.listKey = `image_list_${namespace}`;
  }

  async addImage(source: string, name?: string): Promise<string> {
    const key = this.generateUniqueKey();
    if (!key) {
      throw Error("Get empty key");
    }

    // Save the image data
    await this.saveData(key, { source, name });

    // Update the list of image keys
    const existingList = (await this.loadData<string[]>(this.listKey)) || [];
    const newList = [...existingList, key];
    await this.saveData(this.listKey, newList);

    return key;
  }

  async removeImage(key: string) {
    // Remove the image data
    await localforage.removeItem(key);

    // Update the list of image keys
    const existingList = (await this.loadData<string[]>(this.listKey)) || [];
    const newList = existingList.filter((item) => item !== key);
    await this.saveData(this.listKey, newList);
  }

  async updateImage(key: string, data: Partial<ImageItem>) {
    if (!key) {
      throw Error("No key provided");
    }
    const existData = await this.getImage(key);

    await this.saveData(key, {
      ...existData,
      ...data,
    });
  }

  async getImage(key: string): Promise<ImageItem | null> {
    const existingData = await this.loadData<ImageItem>(key);
    if (!existingData) {
      return null;
    }

    return { ...existingData, key };
  }

  async getImageList(): Promise<ImageItem[]> {
    const keyList = (await this.loadData<string[]>(this.listKey)) || [];

    return (
      await Promise.all(keyList.map(async (key) => await this.getImage(key)))
    ).filter(Boolean) as ImageItem[];
  }
}
