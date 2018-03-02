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

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map(UserActions.setUser)
	);


	constructor(private actions$: Actions,
							private srv: UserService,
							private store: Store<any>,
							private http: HttpClient) {
	}

}
