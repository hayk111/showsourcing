import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { log, LogColor } from '~utils';

const APP_KEY = '_APP_';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	private isBrowser: boolean;

	constructor(@Inject(PLATFORM_ID) platformId: string) {
		this.isBrowser = isPlatformBrowser(platformId);
	}

	setItem(key: string, val: any): void {
		log.debug(`%c 💾 LocalStorage: Saving ${key}... `, LogColor.LOCAL_STORAGE);
		if (this.isBrowser)
			localStorage.setItem(APP_KEY + key, JSON.stringify(val));
	}

	getItem<T>(key: string): T | null {
		log.debug(`%c 💾 LocalStorage: Loading ${key}... `, LogColor.LOCAL_STORAGE);
		if (this.isBrowser)
			return JSON.parse(localStorage.getItem(APP_KEY + key));
		return null;
	}

	setString(key: string, val: string): void {
		if (val === undefined)
			throw Error(`LocalStorage: You tried to save ${key} which is undefined`);
		log.debug(`%c 💾 LocalStorage: Saving ${key}...`, LogColor.LOCAL_STORAGE);
		if (this.isBrowser)
			localStorage.setItem(APP_KEY + key, val);
	}

	getString(key: string): string | null {
		log.debug(`%c 💾 LocalStorage: Loading ${key}... `, LogColor.LOCAL_STORAGE);
		if (this.isBrowser)
			return localStorage.getItem(APP_KEY + key);
		return null;
	}

	remove(key: string): void {
		log.debug(`%c 💾 LocalStorage: removing ${key}...`, LogColor.LOCAL_STORAGE);
		if (this.isBrowser)
			return localStorage.removeItem(APP_KEY + key);
	}

	clear() {
		log.debug(`%c 💾 LocalStorage: clear all...`, LogColor.LOCAL_STORAGE);
		localStorage.clear();
	}
}
