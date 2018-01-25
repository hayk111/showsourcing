import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { EventActions, ActionType } from '../../action/entities/event.action';
import { EventService } from '../../services/event.service';


@Injectable()
export class EventEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => EventActions.addEvents(result))
	);

	constructor( private action$: Actions, private srv: EventService) {}
}

