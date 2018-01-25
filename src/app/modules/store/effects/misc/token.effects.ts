import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, tap, filter, mapTo } from 'rxjs/operators';
import { AuthActions } from '../../action/misc/authentication.action';
import { TokenService } from '../../services/token.service';
import { ActionType } from '../../action/misc/token.action';



@Injectable()
export class TokenEffects {

	@Effect({ dispatch: false })
	set$ = this.actions$.ofType<any>(ActionType.SET).pipe(
		map(action => action.payload),
		tap(token => this.srv.token = token)
	);

	@Effect()
	checkValid$ = this.actions$.ofType<any>(ActionType.CHECK).pipe(
		filter(_ => this.srv.checkAuthToken()),
		map( _ => AuthActions.authenticate(this.srv.token, false) )
	);


	@Effect()
	checkInvalid$ = this.actions$.ofType<any>(ActionType.CHECK).pipe(
		filter(_ => !this.srv.checkAuthToken()),
		map( _ => AuthActions.logout() )
	);

	@Effect({ dispatch: false })
	remove$ = this.actions$.ofType<any>(ActionType.REMOVE).pipe(
		tap(_ => this.srv.removeToken())
	);


	constructor(private actions$: Actions, private srv: TokenService) {}
}
