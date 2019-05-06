import { Injectable } from '@angular/core';
import { SCREENS } from './screens.const';
import { LocalStorageService } from '~core/local-storage';
import { DialogService } from '~shared/dialog';
import { OnBoardingDlgComponent } from '../components/on-boarding-dlg/on-boarding-dlg.component';


export interface Screen {
	picture: string;
	title: string;
	text: string;
}

export interface OnBoardingState {
	currentIndex: number;
	status: 'ongoing' | 'completed';
}

@Injectable({
	providedIn: 'root'
})
export class OnBoardingService {

	screens: Screen[] = SCREENS;
	length = this.screens.length;
	currentIndex = 0;
	private localStorageKey = 'ONBOARDING';

	constructor(
		private storage: LocalStorageService,
		private dlgSrv: DialogService
	) { }

	next() {
		this.currentIndex = Math.min(this.length - 1, this.currentIndex + 1);
		const state: OnBoardingState = { status: 'ongoing', currentIndex: this.currentIndex };
		this.storage.setItem(this.localStorageKey, state);
	}

	back() {
		this.currentIndex = Math.max(0, this.currentIndex - 1);
	}

	complete() {
		const state: OnBoardingState = { status: 'completed', currentIndex: this.currentIndex };
		this.storage.setItem(this.localStorageKey, state);
		this.dlgSrv.close();
	}

	get isCompleted() {
		const state: OnBoardingState = this.storage.getItem(this.localStorageKey) || {} as OnBoardingState;
		return state.status === 'completed';
		// we don't directly open here to not have a circular dependency warning
	}

	get currentScreen() {
		return this.screens[this.currentIndex];
	}

	isLast() {
		return this.currentIndex === this.screens.length - 1;
	}

	isFirst() {
		return this.currentIndex === 0;
	}

}
