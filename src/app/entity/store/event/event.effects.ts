import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { EventHttpService } from './event-http.service';
import { eventActions, eventActionTypes } from './event.action';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';

@Injectable()
export class EventEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(eventActionTypes.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => eventActions.add(result)));

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(eventActionTypes.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.event)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(eventActionTypes.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.event })))
			)
		);

	constructor(private action$: Actions, private srv: EventHttpService, private entitySrv: EntityService) { }
}
