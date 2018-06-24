import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { log } from '~utils';

@Injectable()
export class LocalStorageService {

	private isBrowser: boolean;

	constructor(@Inject(PLATFORM_ID) platformId: string) {
		this.isBrowser = isPlatformBrowser(platformId);
	}

	setItem(key: string, val: any): void {
		log.debug(`%c LocalStorage: Saving ${key}... `, 'color: gold');
		if (this.isBrowser)
			localStorage.setItem(key, JSON.stringify(val));
	}

	getItem<T>(key: string): T | null {
		log.debug(`%c LocalStorage: Loading ${key}... `, 'color: gold');
		if (this.isBrowser)
			return JSON.parse(localStorage.getItem(key));
		return null;
	}

	setString(key: string, val: string): void {
		if (val === undefined)
			throw Error(`LocalStorage: You tried to save ${key} which is undefined`);
		log.debug(`LocalStorage: Saving ${key}...`);
		if (this.isBrowser)
			localStorage.setItem(key, val);
	}

	getString(key: string): string | null {
		log.debug(`%c LocalStorage: Loading ${key}... `, 'color: gold');
		if (this.isBrowser)
			return localStorage.getItem(key);
		return null;
	}

	remove(key: string): void {
		log.debug(`LocalStorage: removing ${key}...`);
		if (this.isBrowser)
			return localStorage.removeItem(key);
	}
}
