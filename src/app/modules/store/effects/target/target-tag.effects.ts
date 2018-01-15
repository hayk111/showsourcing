import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { TypedAction } from '../../utils/typed-action.interface';
import { Actions } from '@ngrx/effects';
import { ActionType, TargetTagActions } from '../../action/target/tag.action';
import { map, switchMap, startWith } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag.model';



@Injectable()
export class TargetTagEffects {

	@Effect()
	load$: Observable<any> = this.actions$.ofType<any>(ActionType.LOAD)
	.pipe(
		map(action => action.payload),
		switchMap(target => this.srv.loadForTarget(target).pipe(
			// we only need the id in target/tag since we are gonna find the real tags in entities/tags
			map((tags: Array<Tag>) => tags.map(t => t.id)),
			map(ids => TargetTagActions.set(ids)),
			startWith(TargetTagActions.setPending() as any)
		))
	);

	@Effect({ dispatch: false })
	add$ = this.actions$.ofType<any>(ActionType.ADD)
	.pipe(
		map(action => action.payload),
		switchMap(p => this.srv.addForTarget(p.tag, p.target))
	);

	@Effect({ dispatch: false })
	remove$ = this.actions$.ofType<any>(ActionType.REMOVE)
	.pipe(
		map(action => action.payload),
		switchMap(p => this.srv.removeForTarget(p.tag, p.target))
	);


	constructor(private actions$: Actions, private srv: TagService) {}

}

