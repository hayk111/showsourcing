import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType } from '../../action/target/target.action';
import { mergeMap, tap } from 'rxjs/operators';
import {  entityRepresentationMap, EntityTarget } from '../../utils/entities.utils';
import { map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { CommentTargetActions } from '../../action/target/comment.action';
import { FileTargetActions } from '../../action/target/file.action';
import { ImageTargetActions } from '../../action/target/images.action';
import { ProjectTargetActions } from '../../action/target/project.action';
import { TagSlctnActions } from '../../action/target/tag-selection.action';
import { TaskTargetActions } from '../../action/target/task.action';
import { VoteSlctnActions } from '../../action/target/vote.action';
import { SupplierActions } from '../../action/entities/index';

@Injectable()
export class SelectionEffects {

	@Effect()
	select$ = this.actions$.ofType<any>(ActionType.SELECT).pipe(
		distinctUntilChanged(),
		map(action => action.payload),
		mergeMap((target: EntityTarget) => this.loadRelatedEntities(target))
	);

	// if a product has been selected we need to load its comments, files, etc.
	// if a supplier has been selected we need to load other things
	loadRelatedEntities(target: EntityTarget) {
		const m = entityRepresentationMap;
		switch (target.entityRepr.entityName) {

			case m.product.entityName:
				return [
					CommentTargetActions.load(),
					FileTargetActions.load(),
					ImageTargetActions.load(),
					ProjectTargetActions.load(),
					TagSlctnActions.load(),
					TaskTargetActions.load(),
					VoteSlctnActions.load(),
				];
			case m.suppliers.entityName:
				return [
					CommentTargetActions.load(),
					FileTargetActions.load(),
					ImageTargetActions.load(),
				]
			default:
				throw Error('entity target not defined in SelectionEffects');
		}
	}

	constructor(private actions$: Actions) {}
}
