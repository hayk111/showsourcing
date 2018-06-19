import { Injectable } from '@angular/core';
import { Team } from '~models';
import { map, filter, switchMap } from 'rxjs/operators';
import { USER_CLIENT_NAME } from '~shared/apollo';
import { TeamQueries } from './team.queries';
import { ApolloClient } from '~shared/apollo';
import { LocalStorageService } from '~shared/local-storage';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


const SELECTED_TEAM_ID = 'selected-team-id';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team from the local storage.
 */
@Injectable({ providedIn: 'root' })
export class TeamService {
	private _selectedTeamId$ = new BehaviorSubject<string>(null);
	// selected team is either null (we don't know yet),
	// undefined ( we know the user hasn't got one)
	// or a team
	private _selectedTeam$ = new BehaviorSubject<Team>(null);
	selectedTeam$ = this._selectedTeam$.asObservable();
	teams$: Observable<Team[]>;

	constructor(
		private apollo: ApolloClient,
		private apolloState: ApolloStateService,
		private storage: LocalStorageService,
		private router: Router) {

		this.restoreSelectedTeam();

		// 1. when the user client is ready we get the user's teams
		this.teams$ = this.apolloState.userClientReady$.pipe(
			filter(ready => !!ready),
			switchMap(_ => this.getTeams())
		);

		// 2. When we have teams we find out what the selected team is
		combineLatest(
			this._selectedTeamId$,
			this.teams$,
			(id, teams) => this.getSelectedTeam(id, teams)
		);

	}

	selectTeams(): Observable<Team[]> {
		return this.apollo.use(USER_CLIENT_NAME).subscribe({ query: TeamQueries.selectTeams }).pipe(
			map((r: any) => r.data.teams)
		);
	}

	pickTeam(team: Team): void {
		this.storage.setItem(SELECTED_TEAM_ID, team.id);
		this._selectedTeamId$.next(team.id);
	}

	hasTeam(): Observable<boolean> {
		return this.selectedTeam$.pipe(
			// null state means we don't know yet
			filter(team => team !== null),
			map(team => !!team)
		);
	}

	private getSelectedTeam(selectedId: string, teams: Team[]) {
		if (!selectedId) {
			this._selectedTeam$.next(undefined);
			this.router.navigate(['user', 'pick-a-team']);
			return null;
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
		this._selectedTeam$.next(undefined);
	}

	/** restore    */
	private restoreSelectedTeam() {
		const selectedTeamId: string = this.storage.getItem(SELECTED_TEAM_ID);
		this._selectedTeamId$.next(selectedTeamId);
	}

	/** gets teams from user realm */
	private getTeams(): Observable<any> {
		return this.apollo.use(USER_CLIENT_NAME).subscribe({
			query: TeamQueries.selectTeams,
		}).pipe(
			map((r: any) => r.data.teams)
		);
	}

}
