import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { User } from '../../store/model/user.model';
import { CountryActions } from '../../store/action/country.action';
import { CurrencyActions } from '../../store/action/currency.action';
import { CategoryActions } from '../../store/action/category.action';
import { Team } from '../../store/model/team.model';
import { Category } from '../../store/model/category.model';
import { Currency } from '../../store/model/currency.model';
import { TeamActions } from '../../store/action/team.action';
import { Country } from '../../store/model/country.model';
import { EventActions } from '../../store/action/event.action';
import { ProjectActions } from '../../store/action/project.action';
import { TagActions } from '../../store/action/tag.action';
import { Tag } from '../../store/model/tag.model';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { switchMap, filter, tap, map } from 'rxjs/operators';
import { SupplierActions } from '../../store/action/supplier.action';
import { CustomFieldsActions } from '../../store/action/custom-fields.action';
import { selectUser, selectUserTeamId } from '../../store/selectors/user.selector';
import { selectAuthentication } from '../../store/selectors/authentication.selector';
import { distinct } from 'rxjs/operators';
import { TeamMembersActions } from '../../store/action/team-members.action';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType, UserActions } from '../action/user.action';
import { CustomFieldsService } from '../services/custom-fields.service';
import { UserService } from '../services/user.service';
import { merge } from 'rxjs/observable/merge';
import { PreloaderActions } from '../action/preloader.action';


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
							private http: HttpClient,
							private cfSrv: CustomFieldsService) {
	}

	private dispatch(action: Action) {
		this.store.dispatch(action);
	}

	private loadUserEntities() {
		this.dispatch(CountryActions.load());
		this.dispatch(CurrencyActions.load());
		this.dispatch(TeamActions.load(this.maxCounter));
	}

	// private loadMaxCounter() {
	// 	// this load maxCounter
	// 	// in MaxCounterEffect
	// 	timer(0, 30000).pipe(
	// 		switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/maxCounter`))
	// 	).subscribe((c: any) => this.maxCounter = c.counter);
	// }

	// private loadTeamEntities() {
	// 	this.dispatch(CategoryActions.load(this.teamId, this.maxCounter));
	// 	this.dispatch(SupplierActions.load(this.teamId, this.maxCounter));
	// 	this.dispatch(EventActions.load(this.teamId, this.maxCounter));
	// 	this.dispatch(ProjectActions.load(this.teamId, this.maxCounter));
	// 	this.dispatch(TagActions.load(this.teamId, this.maxCounter));
	// 	this.dispatch(TeamMembersActions.load(this.teamId, this.maxCounter));
	// 	this.loadCustomFields();
	// 	this.loadMaxCounter();
	// }


	// private loadCustomFields() {
	// 	this.http.get(`api/team/${this.user.currentTeamId}/customFields`)
	// 		.map(r => this.cfSrv.mapCustomFields(r))
	// 		.subscribe(r => this.store.dispatch(CustomFieldsActions.set(r)));
	// }

}
