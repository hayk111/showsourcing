import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Log } from '~utils/index';
import { Observable } from 'rxjs/Observable';
import { EntityTarget, selectFocussedEntity } from '~entity';

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
