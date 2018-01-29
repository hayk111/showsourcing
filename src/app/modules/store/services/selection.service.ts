import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Log from '../../../utils/logger/log.class';
import { Observable } from 'rxjs/Observable';
import { EntityTarget } from '../utils/entities.utils';

@Injectable()
export class SelectionService {

	constructor(private store: Store<any>) {
		Log.debug('[SelectioNService] constructor');
	}

	getSelection(): Observable<EntityTarget> {
		return null;
	}
}
