import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, combineLatest } from 'rxjs';
import { map, switchMap, tap, filter, shareReplay, distinctUntilChanged, switchMapTo } from 'rxjs/operators';
import { SelectParams } from '~global-services/_global/select-params';
import { Team } from '~models';

import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { TeamQueries } from '~global-services/team/team.queries';
import { log } from '~utils';
import { LocalStorageService } from '~shared/local-storage';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { ApolloStateService, ClientStatus } from '~shared/apollo/services/apollo-state.service';
import { AuthStatus } from '~features/auth/interfaces/auth-state.interface';
import { Router } from '@angular/router';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {

	defaultClient = Client.USER;

	/** this is the team selected at the moment of the selection */
	private _selectedTeam$ = new ReplaySubject<Team>(1);
	selectedTeam$ = this._selectedTeam$.asObservable().pipe(
		shareReplay(),
	);
	hasTeamSelected$ = this._selectedTeam$.asObservable().pipe(
		map(team => !!team)
	);
	// synchronous version for easy access
	selectedTeamSync: Team;

	constructor(
		protected apolloState: ApolloStateService,
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService
	) {
		super(apolloState, TeamQueries, 'team', 'teams');
	}

	init() {

		this.authSrv.authenticated$.pipe(
			map(_ => this.getSelectedTeam())
		).subscribe(this._selectedTeam$);

		// when logging out let's clear the current selected team
		this.authSrv.notAuthenticated$.subscribe(_ => this.resetSelectedTeam());

		// putting a sync version of team
		this.selectedTeam$.subscribe(team => this.selectedTeamSync = team);
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return super.create(team).pipe(
			switchMap(_ => this.waitForOne(`id == "${team.id}" AND status == "active"`)),
			switchMap(_ => this.pickTeam(team))
		);
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM, team);
		this._selectedTeam$.next(team);
		return this.selectedTeam$.pipe(
			filter(x => !!x)
		);
	}

	/** restore from local storage   */
	private restoreSelectedTeamId() {
		const selectedTeam: Team = this.storage.getItem(SELECTED_TEAM);
		this._selectedTeam$.next(selectedTeam);
	}

	private getSelectedTeam() {
		return this.storage.getItem(SELECTED_TEAM);
	}

	private resetSelectedTeam() {
		this.storage.remove(SELECTED_TEAM);
		this._selectedTeam$.next(undefined);
	}

}


