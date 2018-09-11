import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, combineLatest } from 'rxjs';
import { map, switchMap, tap, filter, shareReplay, distinctUntilChanged } from 'rxjs/operators';
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
const SELECTED_TEAM_ID = 'selected-team-id';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {

	defaultClient = Client.USER;

	private _selectedTeamId$ = new ReplaySubject<string>(1);
	selectedTeamId$ = this._selectedTeamId$.asObservable();
	hasTeamSelected$ = this._selectedTeamId$.asObservable().pipe(
		map(team => !!team),
	);
	private _selectedTeam$ = new ReplaySubject<Team>(1);
	selectedTeam$ = this._selectedTeam$.asObservable().pipe(
		filter(team => !!team),
		shareReplay(1),

	);
	selectedTeamSync;
	teams$: Observable<Team[]>;


	constructor(
		protected apolloState: ApolloStateService,
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService
	) {
		super(apolloState, TeamQueries, 'team', 'teams');
	}

	init() {
		this.restoreSelectedTeamId();

		this.teams$ = this.selectAll();

		// 2. When we have teams we find out what the selected team is
		combineLatest(
			this._selectedTeamId$,
			this.teams$,
			(id, teams) => this.getSelectedTeam(id, teams)
		).subscribe(this._selectedTeam$);

		// when logging out let's clear the current selected team
		this.authSrv.authStatus$.subscribe(status => {
			if (status === AuthStatus.NOT_AUTHENTICATED)
				this.resetSelectedTeam();
		});

		// putting a sync version of team
		this.selectedTeam$.subscribe(team => this.selectedTeamSync = team);
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return super.create(team).pipe(
			switchMap(_ => this.waitForOne(`id == "${team.id}" AND status == "active"`)),
			tap(_ => this.pickTeam(team))
		);
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): void {
		this.storage.setItem(SELECTED_TEAM_ID, team.id);
		this._selectedTeamId$.next(team.id);
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
