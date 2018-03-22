import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { TagService } from '../../services/tag.service';
import { TagActionTypes as ActionType, TagActions } from '../../action/entities/index';
import { Tag } from '~app/app-root/store';
import { Swap, EntityService, ERM } from '~app/shared/entity';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class TagEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => TagActions.add(result)));

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

	constructor(private action$: Actions, private srv: TagService, private entitySrv: EntityService) {}
}
