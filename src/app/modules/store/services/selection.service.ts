import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Log from '../../../utils/logger/log.class';
import { Observable } from 'rxjs/Observable';
import { EntityTarget } from '../utils/entities.utils';
import { selectCurrentSelection } from '../selectors/selection/selection.selector';
import { map } from 'rxjs/operators';

@Injectable()
export class SelectionService {
	currentTarget: EntityTarget;

	constructor(private store: Store<any>) {
		Log.debug('[SelectionService] constructor');
		this.store.select(selectCurrentSelection).subscribe(s => this.currentTarget = s);
	}


	getSelection(): Observable<EntityTarget> {
		return this.store.select(selectCurrentSelection);
	}
}
