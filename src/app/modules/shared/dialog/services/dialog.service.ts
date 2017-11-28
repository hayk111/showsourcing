import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DialogNames } from '../dialogs.enum';
import Log from '../../../../utils/logger/log.class';

@Injectable()
export class DialogService {

	dialogs: any = {};

	constructor() {
		Log.debug(`DialogService created`);
	}

	registerDialog(name: DialogNames) {
		return this.dialogs[name] = new Subject<boolean>();
	}

	unregisterDialog(name: DialogNames) {
		delete this.dialogs[name];
	}

	open(name: DialogNames) {
		if (!this.dialogs[name])
			throw Error(`dialog with name ${name} not found, you are probably registered the dialog with another name`);
		this.dialogs[name].next(true);
	}

	close(name: DialogNames) {
		if (!this.dialogs[name])
			throw Error(`dialog with name ${name} not found, you are probably registered the dialog with another name`);
		this.dialogs[name].next(false);
	}

}
