import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { TagService } from '../../services/tag.service';
import { TagActionTypes as ActionType, TagActions } from '../../action/entities/index';


@Injectable()
export class TagEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => TagActions.add(result))
	);

	constructor( private action$: Actions, private srv: TagService) {}
}

