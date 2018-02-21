import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap, filter, skip, take, first } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { Store } from '@ngrx/store';
import { CategoryActions } from '../../action/entities/index';
import { SupplierActions } from '../../action/entities/index';
import { EventActions } from '../../action/entities/index';
import { ProjectActions } from '../../action/entities/index';
import { TagActions } from '../../action/entities/index';
import { TeamMembersActions } from '../../action/entities/index';
import { CustomFieldsActions } from '../../action/entities/index';
import { interval } from 'rxjs/observable/interval';
import { ActionType } from '../../action/misc/preloader.action';
import { PreloaderService } from '../../services/preloader.service';
import { ProductActionsFactory } from '../../../products';
import { TaskActions } from '../../action/entities/index';

@Injectable()
export class PreloaderEffects {
	// current max counter start at a negative value so it's lower than whatever comes back from the server
	// (which should be positive)
	static CURRENT = -1;
	static RELOAD_TIME = 150000;

	// here we first request the entities with a negative maxCounter
	// then we load the maxCounter every x seconds and if it's bigger that the
	// current counter we reload each entities (except those that don't need to)
	@Effect({ dispatch: false })
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		tap(id => this.getEntities(id)),
		tap(id => this.getOnceEntities(id)),
		switchMap(id => interval(PreloaderEffects.RELOAD_TIME).map(x => id)),
		switchMap(
			id =>
				this.srv
					.loadMaxCounter(id)
					.map((r: any) => r.counter)
					.filter(c => c > PreloaderEffects.CURRENT),
			(id, counter: number) => {
				if (counter > PreloaderEffects.CURRENT && PreloaderEffects.CURRENT !== -1)
					this.getEntities(id, PreloaderEffects.CURRENT);
				PreloaderEffects.CURRENT = counter;
			}
		)
	);

	private getEntities(id, maxCounter = -1) {
		this.dispatch(ProductActionsFactory.load({ id, maxCounter }));
		this.dispatch(TaskActions.load({ id, maxCounter }));
		this.dispatch(CategoryActions.load({ id, maxCounter }));
		this.dispatch(SupplierActions.load({ id, maxCounter }));
		this.dispatch(EventActions.load({ id, maxCounter }));
		this.dispatch(ProjectActions.load({ id, maxCounter }));
		this.dispatch(TagActions.load({ id, maxCounter }));
		this.dispatch(TeamMembersActions.load({ id, maxCounter }));
	}

	private getOnceEntities(id, maxCounter = -1) {
		this.dispatch(CustomFieldsActions.load({ id, maxCounter }));
	}

	private dispatch(any: any) {
		this.store.dispatch(any);
	}

	constructor(private action$: Actions, private srv: PreloaderService, private store: Store<any>) {}
}
