import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HarbourActionTypes as ActionType, HarbourActions } from '../../action/entities/index';
import { switchMap, map } from 'rxjs/operators';
import { HarbourService } from '~app/app-root/store/services/harbour.service';

@Injectable()
export class HarbourEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => HarbourActions.add(result)));

	constructor(private action$: Actions, private srv: HarbourService) {}
}
