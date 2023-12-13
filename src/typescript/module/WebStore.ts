import { KEY_STORE } from "./EKeyStore";

export class WebStore {

    // Setter
    private static setItem(storage: Storage, key: KEY_STORE, value: string): void {
        storage.setItem(KEY_STORE[key], value);
    }

    public static setItemInLocalStorage(key: KEY_STORE, value: string): void {
        WebStore.setItem(localStorage, key, value);
    }

    public static setItemInSessionStorage(key: KEY_STORE, value: string): void {
        WebStore.setItem(sessionStorage, key, value);
    }

    // Getter

    private static getItem(storage: Storage, key: KEY_STORE, defaultValue: string) {
        let v = storage.getItem(KEY_STORE[key]);
        return v === null ? defaultValue : v;
    }

    public static getItemInLocalStorage(key: KEY_STORE, defaultValue: string): string {
        return WebStore.getItem(localStorage, key, defaultValue);
    }

    public static getItemInSessionStorage(key: KEY_STORE, defaultValue: string): string {
        return WebStore.getItem(sessionStorage, key, defaultValue);
    }
}
