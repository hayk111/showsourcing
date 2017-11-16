import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../store/model/user.model';
import { CountryActions } from '../../../store/action/country.action';
import { CurrencyActions } from '../../../store/action/currency.action';
import { CategoryActions } from '../../../store/action/category.action';
import { Team } from '../../../store/model/team.model';
import { Category } from '../../../store/model/category.model';
import { Currency } from '../../../store/model/currency.model';
import { TeamActions } from '../../../store/action/team.action';
import { Country } from '../../../store/model/country.model';
import { EventActions } from '../../../store/action/event.action';
import { ProjectActions } from '../../../store/action/project.action';
import { TagActions } from '../../../store/action/tag.action';
import { Tag } from '../../../store/model/tag.model';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { switchMap } from 'rxjs/operators';
import { SupplierActions } from '../../../store/action/supplier.action';

@Injectable()
export class PreloaderService {

	private user: User;
	private maxCounter = 0;
	private reloadTime = 1500000;

	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select('user')
			.subscribe((user: User) => this.user = user);
		this.store.select('authentication')
			.filter(auth => auth.authenticated)
			.subscribe(a => this.loadEverything());
	}

	private loadEverything() {
		this.loadCountries();
		this.loadCurrencies();
		this.loadCategories();
		this.loadSuppliers();
		this.loadTeams();
		this.loadEvents();
		this.loadProjects();
		this.loadTags();

		// this should be the last one
		this.loadMaxCounter();

	}

	private loadCountries() {
		this.http.get('api/country')
		.subscribe((c: Array<Country>) => this.store.dispatch(CountryActions.setCountries(c)));
	}

	private loadCurrencies() {
		this.http.get('api/currency')
			.subscribe((c: Array<Currency>) => this.store.dispatch(CurrencyActions.setCurrencies(c)));
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
			switchMap(i => this.http.get(`api/user/${this.user.id}/team?counter=${this.maxCounter}`))
		).subscribe((t: Array<Team>) => this.store.dispatch(TeamActions.setTeams(t)));
	}

	private loadEvents() {
		timer(0, this.reloadTime).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/event?counter=${this.maxCounter}`))
		).subscribe((t: any) => this.store.dispatch(EventActions.setEvents(t.elements)));
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

	private loadMaxCounter() {
		timer(0, 30000).pipe(
			switchMap(i => this.http.get(`api/team/${this.user.currentTeamId}/maxCounter`))
		).subscribe((c: any) => this.maxCounter = c.counter);
	}
}
