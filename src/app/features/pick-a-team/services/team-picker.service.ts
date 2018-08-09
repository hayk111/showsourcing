import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, skip } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { Team } from '~models';
import { USER_CLIENT } from '~shared/apollo/services/initializers/client-names.const';
import { ApolloStateService } from '~shared/apollo/services/initializers/apollo-state.service';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { LocalStorageService } from '~shared/local-storage';
import { TeamQueries } from '~global-services/team/team.queries';



const SELECTED_TEAM_ID = 'selected-team-id';

/**
 * Team Picker service. It's outside of TeamService so we don't
 * Create the team service when the user client isn't yet ready.
 * Because the HasTeamGuard is injeting TeamPickerService and is
 * instantiated before the user client is ready.
 */
@Injectable({ providedIn: 'root' })
export class TeamPickerService {
	private queries = new TeamQueries();
	private _selectedTeamId$ = new ReplaySubject<string>(1);
	private _selectedTeam$ = new ReplaySubject<Team>(1);
	selectedTeam$ = this._selectedTeam$.asObservable().pipe(shareReplay(1));
	teams$: Observable<Team[]>;

	constructor(
		protected wrapperTemp: ApolloWrapper,
		protected apolloState: ApolloStateService,
		private storage: LocalStorageService,
		private authSrv: AuthenticationService,
		private wrapper: ApolloWrapper
	) { }

	init() {
		this.restoreSelectedTeam();
		// when we created this service the user client could be undefined
		// because the team service is injected in guards
		// 1. when the user client is ready we get the user's teams
		this.teams$ = this.apolloState.userClientReady$.pipe(
			filter(state => state.ready),
			// we want to recheck only when the list of team change, not when one is mutated
			// therefor we can check if ids in both teams are the same.
			// usually the order won't change so this check should be enough
			distinctUntilChanged(),
			switchMap(_ => this.selectAll()),
		);

		// 2. When we have teams we find out what the selected team is
		combineLatest(
			this._selectedTeamId$,
			this.teams$,
			(id, teams) => this.getSelectedTeam(id, teams)
		).subscribe(this._selectedTeam$);

		// when logging out let's clear the current selected team
		this.authSrv.authState$.subscribe(authState => {
			if (!authState.authenticated)
				this.resetSelectedTeam();
		});
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM_ID, team.id);
		this._selectedTeamId$.next(team.id);
		return this._selectedTeam$.pipe();
	}

	get hasTeamSelected$(): Observable<boolean> {
		return this.selectedTeam$.pipe(
			map(team => !!team)
		);
	}

	/** restore from local storage   */
	private restoreSelectedTeam() {
		const selectedTeamId: string = this.storage.getItem(SELECTED_TEAM_ID);
		this._selectedTeamId$.next(selectedTeamId);
	}

	private getSelectedTeam(selectedId: string, teams: Team[]) {
		return selectedId ? teams.find(team => team.id === selectedId) : undefined;
	}

	private resetSelectedTeam() {
		this.storage.remove(SELECTED_TEAM_ID);
		this._selectedTeamId$.next(undefined);
	}

	private selectAll() {
		return this.wrapper.use(USER_CLIENT)
			.selectAll({ gql: this.queries.all() });
	}

}
