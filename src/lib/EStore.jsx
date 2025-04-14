
class EStore {
  static async setItem(key, value) {
    await window.estore.setItem(key, value);
  }

  static async getItem(key) {
    return await window.estore.getItem(key);
  }

  static async removeItem(key) {
    await window.estore.removeItem(key);
  }

  static async clear() {
    await window.estore.clear();
  }
}

export default EStore;
