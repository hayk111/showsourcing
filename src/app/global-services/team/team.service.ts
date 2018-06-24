import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Team } from '~models';
import { ApolloClient } from '~shared/apollo/services/apollo-client.service';
import { USER_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { LocalStorageService } from '~shared/local-storage';

import { TeamQueries } from './team.queries';
import { GlobalService } from '../_global/global.service';


const SELECTED_TEAM_ID = 'selected-team-id';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {
	private _selectedTeamId$ = new ReplaySubject<string>(1);
	private _selectedTeam$ = new ReplaySubject<Team>(1);
	selectedTeam$ = this._selectedTeam$.asObservable();
	teams$: Observable<Team[]>;


	constructor(
		protected apollo: ApolloClient,
		private apolloState: ApolloStateService,
		private storage: LocalStorageService,
		private router: Router) {

		super(apollo, new TeamQueries(), 'Team');
		this.init();
	}

	init() {
		this.restoreSelectedTeam();

		// 1. when the user client is ready we get the user's teams
		this.teams$ = this.apolloState.userClientReady$.pipe(
			filter(ready => !!ready),
			switchMap(_ => this.getTeams())
		);
		this.teams$.subscribe();

		// 2. When we have teams we find out what the selected team is
		combineLatest(
			this._selectedTeamId$,
			this.teams$,
			(id, teams) => this.getSelectedTeam(id, teams)
		).subscribe(this._selectedTeam$);
	}

	selectAll(): Observable<Team[]> {
		return this.teams$;
	}

	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM_ID, team.id);
		this._selectedTeamId$.next(team.id);
		return this._selectedTeam$;
	}

	create(team: Team): Observable<any> {
		return this.apollo.use(USER_CLIENT).update({
			gql: this.queries.create,
			input: team,
			typename: 'Team'
		}).pipe(
			switchMap(_ => this.waitTeamValid(team)),
			switchMap(_ => this.pickTeam(team))
		);
	}

	get hasTeam$(): Observable<boolean> {
		return this.selectedTeam$.pipe(
			map(team => !!team)
		);
	}

	private getSelectedTeam(selectedId: string, teams: Team[]) {
		if (!selectedId) {
			this.router.navigate(['user', 'pick-a-team']);
			return;
		}
		// if the user has selected a team during the current session
		let teamSelected;
		if (teamSelected = teams.find(team => team.id === selectedId)) {
			return teamSelected;
			// if not we redirect the user so he can pick a team
		} else if (teams.length > 0) {
			this.router.navigate(['user', 'pick-a-team']);
			// if there are no team we redirect the user to a page that lets him create a team
		} else {
			this.router.navigate(['user', 'create-a-team']);
		}
	}

	/** restore    */
	private restoreSelectedTeam() {
		const selectedTeamId: string = this.storage.getItem(SELECTED_TEAM_ID);
		this._selectedTeamId$.next(selectedTeamId);
	}

	/** gets teams from user realm */
	private getTeams(): Observable<any> {
		return this.apollo.use(USER_CLIENT).selectMany({
			gql: this.queries.all('id, name, realmPath, realmServerName'),
		});
	}

	/** waits for a team to go from pending to active */
	private waitTeamValid(team: Team) {
		return this.apollo.use(USER_CLIENT).selectMany({
			gql: this.queries.list,
			query: `id == "${team.id}" AND status == "active"`
		});
	}

}
