import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { EventService } from '../services';
import { EventActions, EventActionTypes } from './events.action';

@Injectable()
export class EventEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(EventActionTypes.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => EventActions.add(result)));

	constructor(private action$: Actions, private srv: EventService) {}
}
