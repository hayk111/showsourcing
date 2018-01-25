import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { TagService } from '../../services/tag.service';
import { TagActions, ActionType } from '../../action/entities/tag.action';


@Injectable()
export class TagEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => TagActions.addTags(result))
	);

	constructor( private action$: Actions, private srv: TagService) {}
}

