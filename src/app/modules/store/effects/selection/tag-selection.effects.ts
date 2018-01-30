import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { Injectable } from '@angular/core';
import { ActionType, TagSlctnActions } from '../../action/selection/tag-selection.action';
import { TagService } from '../../services/tag.service';


@Injectable()
export class TagSelectionEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.loadForTarget(target)),
		map((r: any) => TagSlctnActions.set(r))
	);

	@Effect({ dispatch: false })
	add$ = this.actions$.ofType<any>(ActionType.ADD).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (tag, target) => ({tag, target})),
		switchMap(({tag, target}) => this.srv.addForTarget(tag, target)),
	);

	constructor(private actions$: Actions, private srv: TagService, private selectionSrv: SelectionService) {}
}
