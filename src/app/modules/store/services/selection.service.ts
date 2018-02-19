import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Log from '../../../utils/logger/log.class';
import { Observable } from 'rxjs/Observable';
import { EntityTarget } from '../utils/entities.utils';
import { selectCurrentTarget } from '../selectors/target/target.selector';
import { map } from 'rxjs/operators';

@Injectable()
export class SelectionService {
	currentTarget: EntityTarget;

	constructor(private store: Store<any>) {
		Log.debug('[SelectionService] constructor');
		this.store.select(selectCurrentTarget).subscribe( s => this.currentTarget = s);
	}


	getSelection(): Observable<EntityTarget> {
		return this.store.select(selectCurrentTarget);
	}
}
