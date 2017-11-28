import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DialogService {

	dialogs: any = {};

	constructor() { }

	registerDialog(name: string) {
		return this.dialogs[name] = new Subject<boolean>();
	}

	unregisterDialog(name: string) {
		delete this.dialogs[name];
	}

	open(name: string) {
		this.dialogs[name].next(true);
	}

	close(name: string) {
		this.dialogs[name].next(false);
	}

}
