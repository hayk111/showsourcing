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
import { entityRepresentationMap } from '../../store/model/filter.model';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType } from '../action/user.action';
import { CustomFieldsService } from '../services/custom-fields.service';


@Injectable()
export class UserEffects {

	private user: User;
	private maxCounter = 0;
	private reloadTime = 1500000;

	@Effect({ dispatch: false })
	user$ = this.actions$.ofType<any>(ActionType.SET_USER).pipe(
		// when there isn't an user id no need to continue
		map(action => action.payload),
		filter((user: User) => !!user.id),
		tap(user => this.loadUserEntities()),
		map(user => user.currentTeamId),
		distinct(),
		tap(id => this.loadTeamEntities())
	);

	constructor(private actions$: Actions, private store: Store<any>, private http: HttpClient,
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

	private loadTeamEntities() {
		// this.loadTeamMembers();
		// this.loadCategories();
		// this.loadSuppliers();
		// this.loadEvents();
		// this.loadProjects();
		// this.loadTags();
		// this.loadCustomFields();
		// this.loadMaxCounter();
	}

	private loadCategories() {
		timer(0, this.reloadTime).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/category?counter=${this.maxCounter}`))
		).subscribe((c: Array<Category>) => this.store.dispatch(CategoryActions.addCategories(c)));
	}

	private loadSuppliers() {
		timer(0, this.reloadTime).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/supplier?counter=${this.maxCounter}`))
		).subscribe((t: any) => this.store.dispatch(SupplierActions.setSuppliers(t.elements)));
	}

	private loadTeams() {
		timer(0, this.reloadTime).pipe(
			switchMap(i => this.http.get(`api/user/${this.user.id}/team?counter=${this.maxCounter}`)),
		).subscribe((t: Array<Team>) => this.store.dispatch(TeamActions.setTeams(t)));
	}

	private loadEvents() {
		timer(0, this.reloadTime)
		.subscribe((t: any) => this.dispatch(TeamActions.load(this.maxCounter)));
	}

	private loadProjects() {
		timer(0, this.reloadTime).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/project?counter=${this.maxCounter}`))
		).subscribe((t: any) => this.store.dispatch(ProjectActions.setProjects(t.elements)));
	}

	private loadTags() {
		timer(0, this.reloadTime).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/tag?counter=${this.maxCounter}`))
		).subscribe((t: Array<Tag>) => this.store.dispatch(TagActions.setTags(t)));
	}

	private loadTeamMembers() {
		timer(0, this.reloadTime).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/user?counter=${this.maxCounter}`))
		).subscribe((t: Array<User>) => this.store.dispatch(TeamMembersActions.setMembers(t)));
	}

	private loadMaxCounter() {
		timer(0, 30000).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/maxCounter`))
		).subscribe((c: any) => this.maxCounter = c.counter);
	}


	private loadCustomFields() {
		this.http.get(`api/team/${this.user.currentTeamId}/customFields`)
			.map(r => this.cfSrv.mapCustomFields(r))
			.subscribe(r => this.store.dispatch(CustomFieldsActions.set(r)));
	}

}
