// Salva vários produtos de uma vez
export function saveProducts(products) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      let count = 0;
      for (const prod of products) {
        if (prod.barcode) {
          store.put(prod);
          count++;
        }
      }
      tx.oncomplete = () => {
        console.log(`Produtos salvos no IndexedDB: ${count}`);
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  });
}

// Limpa todos os produtos do IndexedDB
export function clearProducts() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}
// indexeddb.js - utilitário simples para IndexedDB

const DB_NAME = 'precix_db';
const STORE_NAME = 'products';
const DEVICE_STORE = 'device_info';
const DB_VERSION = 2;

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'barcode' });
      }
      if (!db.objectStoreNames.contains(DEVICE_STORE)) {
        db.createObjectStore(DEVICE_STORE, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function getProduct(barcode) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(barcode);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

export function saveProduct(product) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(product);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

export function saveDeviceUUID(uuid) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DEVICE_STORE, 'readwrite');
      const store = tx.objectStore(DEVICE_STORE);
      store.put({ key: 'uuid', value: uuid });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  });
}

export function getDeviceUUID() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      if (!db.objectStoreNames.contains(DEVICE_STORE)) {
        resolve(null);
        return;
      }
      const tx = db.transaction(DEVICE_STORE, 'readonly');
      const store = tx.objectStore(DEVICE_STORE);
      const req = store.get('uuid');
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => reject(req.error);
    });
  });
}
