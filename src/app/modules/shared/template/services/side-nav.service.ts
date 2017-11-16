import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SideNavService {
	private _isOpen = new ReplaySubject<boolean>();
	private lastValue;

	constructor() {
	}

	toggle() {
		this.lastValue = !this.lastValue;
		this._isOpen.next(this.lastValue);
	}

	open() {
		this._isOpen.next(true);
		this.lastValue = true;
	}

	close() {
		this._isOpen.next(false);
		this.lastValue = false;
	}

	get isOpen(){
		return this._isOpen;
	}

}
