import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Log from '../../../utils/logger/log.class';

@Injectable()
export class LocalStorageService {

	private isBrowser: boolean;

	constructor(@Inject(PLATFORM_ID) platformId: string) {
		this.isBrowser = isPlatformBrowser(platformId);
	}

	setItem(key: string, val: any): void {
		Log.debug(`LocalStorage: Saving ${key}...`);
		if (this.isBrowser)
			localStorage.setItem(key, JSON.stringify(val));
	}

	getItem<T>(key: string): T | null {
		Log.debug(`LocalStorage: Loading ${key}...`);
		if (this.isBrowser)
			return JSON.parse(localStorage.getItem(key));
		return null;
	}

	setString(key: string, val: string): void {
		if (val === undefined)
			throw Error(`LocalStorage: You tried to save ${key} which is undefined`);
		Log.debug(`LocalStorage: Saving ${key}...`);
		if (this.isBrowser)
			localStorage.setItem(key, val);
	}

	getString(key: string): string | null {
		Log.debug(`LocalStorage: Loading ${key}...`);
		if (this.isBrowser)
			return localStorage.getItem(key);
		return null;
	}

	remove(key: string): void {
		Log.debug(`LocalStorage: removing ${key}...`);
		if (this.isBrowser)
			return localStorage.removeItem(key);
	}
}
