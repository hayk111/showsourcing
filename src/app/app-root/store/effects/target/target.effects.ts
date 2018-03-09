import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { CommentTargetActions } from '~comment/store/actions/comment.action';

import { FileActions } from '~features/file';
import { ImageActions } from '~features/file';
import { ActionType } from '../../action/target/target.action';
import { TaskTargetActions } from '../../action/target/task.action';
import { VoteSlctnActions } from '../../action/target/vote.action';
import { ERM, EntityTarget } from '~entity';

@Injectable()
export class TargetEffects {
	@Effect()
	select$ = this.actions$
		.ofType<any>(ActionType.SELECT)
		.pipe(
			distinctUntilChanged(),
			map(action => action.payload),
			mergeMap((target: EntityTarget) => this.loadRelatedEntities(target))
		);

	// if a product has been selected we need to load its comments, files, etc.
	// if a supplier has been selected we need to load other things
	loadRelatedEntities(target: EntityTarget) {
		const m = ERM;
		switch (target.entityRepr.entityName) {
			case m.product.entityName:
				return [
					CommentTargetActions.load(),
					FileActions.load(),
					ImageActions.load(),
					TaskTargetActions.load(),
					VoteSlctnActions.load(),
				];
			case m.suppliers.entityName:
				return [CommentTargetActions.load(), FileActions.load(), ImageActions.load()];
			default:
				throw Error('entity target not defined in TargetEffects');
		}
	}

	constructor(private actions$: Actions) {}
}
