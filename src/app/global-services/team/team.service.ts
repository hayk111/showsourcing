import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, combineLatest } from 'rxjs';
import { map, switchMap, tap, filter, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { SelectParams } from '~global-services/_global/select-params';
import { Team } from '~models';
import { USER_CLIENT } from '~shared/apollo/services/initializers/client-names.const';
import { ApolloStateService } from '~shared/apollo/services/initializers/apollo-state.service';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { TeamQueries } from '~global-services/team/team.queries';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';
import { log } from '~utils';
import { LocalStorageService } from '~shared/local-storage';
import { AuthenticationService } from '~features/auth/services/authentication.service';

// name in local storage
const SELECTED_TEAM_ID = 'selected-team-id';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {

	defaultClient = USER_CLIENT;

	private _selectedTeamId$ = new ReplaySubject<string>(1);
	private _selectedTeam$ = new ReplaySubject<Team>(1);
	selectedTeam$ = this._selectedTeam$.asObservable().pipe(
		shareReplay(1),
	);
	teams$: Observable<Team[]>;


	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		private storage: LocalStorageService,
		private authSrv: AuthenticationService
	) {
		super(apollo, new TeamQueries(), 'Team');
		log.debug('team service constructor');
	}

	init() {
		this.restoreSelectedTeamId();
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

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return super.create(team).pipe(
			switchMap(_ => this.waitForOne(`id == "${team.id}" AND status == "active"`)),
			tap(_ => this.pickTeam(team))
		);
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
	private restoreSelectedTeamId() {
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

}
