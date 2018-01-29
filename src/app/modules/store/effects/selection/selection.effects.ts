import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType } from '../../action/selection/selection.action';
import { mergeMap, tap } from 'rxjs/operators';
import {  entityRepresentationMap, EntityTarget } from '../../utils/entities.utils';
import { map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { CommentSlctnActions } from '../../action/selection/comment-selection.action';
import { FileSlctnActions } from '../../action/selection/file-selection.action';
import { ImageSlctnActions } from '../../action/selection/images-selection.action';
import { ProjectSlctnActions } from '../../action/selection/project-selection.action';
import { TagSlctnActions } from '../../action/selection/tag-selection.action';
import { TaskSlctnActions } from '../../action/selection/task-selection.action';
import { VoteSlctnActions } from '../../action/selection/vote-selection.action';

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
					CommentSlctnActions.load(),
					FileSlctnActions.load(),
					ImageSlctnActions.load(),
					ProjectSlctnActions.load(),
					TagSlctnActions.load(),
					TaskSlctnActions.load(),
					VoteSlctnActions.load()
				];
		}
	}

	constructor(private actions$: Actions) {}
}
