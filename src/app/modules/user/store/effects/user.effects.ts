import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { User } from '~user/models';
import { CountryActions } from '~store/action/entities/index';
import { CurrencyActions } from '~store/action/entities/index';
import { TeamActions } from '~store/action/entities/index';
import { switchMap, filter, tap, map } from 'rxjs/operators';
import { distinct } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType, UserActions } from '~user/store/actions';
import { UserService } from '~user/services';
import { PreloaderActions } from '~store/action/misc/preloader.action';


@Injectable()
export class UserEffects {

	private user: User;
	private maxCounter = 0;
	private reloadTime = 1500000;
	private teamId: string;

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map(UserActions.setUser)
	);

	@Effect()
	user$ = this.actions$.ofType<any>(ActionType.SET_USER).pipe(
		// when there isn't an user id no need to continue
		map(action => action.payload),
		filter((user: User) => !!user.id),
		tap(user => this.loadUserEntities()),
		tap(user => this.user = user),
		map(user => user.currentTeamId),
		distinct(),
		// tap(id => this.teamId = id),
		map(id => PreloaderActions.load(id))
		// tap(id => this.loadTeamEntities()),
	);

	constructor(private actions$: Actions,
							private srv: UserService,
							private store: Store<any>,
							private http: HttpClient) {
	}

	private dispatch(action: Action) {
		this.store.dispatch(action);
	}

	private loadUserEntities() {
		this.dispatch(CountryActions.load());
		this.dispatch(CurrencyActions.load());
		this.dispatch(TeamActions.load(this.maxCounter));
	}


}
