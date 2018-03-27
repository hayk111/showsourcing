import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, switchMap } from 'rxjs/operators';

import { ERM } from '../entity.model';
import { EntityService } from '../entity.service';
import { TagHttpService } from './tag-http.service';
import { tagActions, tagActionTypes as ActionType } from './tag.action';

@Injectable()
export class TagEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => tagActions.add(result)));

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(ActionType.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.tags)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(ActionType.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.tags })))
			)
		);

	@Effect({ dispatch: false })
	merge$ = this.action$
		.ofType<any>(ActionType.MERGE)
		.pipe(
			map(action => action.payload),
			switchMap(ids => this.entitySrv.merge({ base: ERM.teams, target: ERM.tags, body: ids }))
		);

	constructor(private action$: Actions, private srv: TagHttpService, private entitySrv: EntityService) { }
}
