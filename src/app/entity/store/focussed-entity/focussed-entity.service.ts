import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EntityTarget } from '~entity/store/entity.model';
import { Log } from '~utils';

import { selectFocussedEntity } from './focussed-entity.selector';

@Injectable()
export class FocussedEntityService {
	currentTarget: EntityTarget;

	constructor(private store: Store<any>) {
		Log.debug('[SelectionService] constructor');
		this.store.select(selectFocussedEntity).subscribe(s => this.currentTarget = s);
	}


	getSelection(): Observable<EntityTarget> {
		return this.store.select(selectFocussedEntity);
	}
}
