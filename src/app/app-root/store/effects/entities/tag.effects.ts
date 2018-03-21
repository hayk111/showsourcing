import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { TagService } from '../../services/tag.service';
import { TagActionTypes as ActionType, TagActions } from '../../action/entities/index';
import { Tag } from '~app/app-root/store';
import { Swap } from '~app/shared/entity';

@Injectable()
export class TagEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => TagActions.add(result)));

	@Effect()
	create$ = this.action$
		.ofType<any>(ActionType.CREATE)
		.pipe(
			map(action => action.payload),
			switchMap((tag: Tag) => this.srv.create(tag), (tag, r) => TagActions.replace([new Swap(tag, r)]))
		);

	constructor(private action$: Actions, private srv: TagService) {}
}
