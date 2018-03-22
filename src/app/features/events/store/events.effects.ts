import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { EventService } from '../services';
import { EventActions, EventActionTypes } from './events.action';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { EntityService, ERM } from '~app/shared/entity';

@Injectable()
export class EventEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(EventActionTypes.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => EventActions.add(result)));

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(EventActionTypes.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.events)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(EventActionTypes.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.events })))
			)
		);

	constructor(private action$: Actions, private srv: EventService, private entitySrv: EntityService) {}
}
