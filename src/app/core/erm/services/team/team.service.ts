import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { Team } from '~core/erm/models';
import { TeamQueries } from '~core/erm/services/team/team.queries';
import { GlobalService } from '~core/erm2/global.service-2';
import { LocalStorageService } from '~core/local-storage';
import { CompanyService } from '../company/company.service';
import { customQueries } from './team.custom-queries';



// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {


	/** event the team selected at the moment of the selection */
	private _teamSelectionEvent$ = new ReplaySubject<Team>(1);
	teamSelectionEvent$ = this._teamSelectionEvent$.asObservable().pipe(
		shareReplay(1),
	);
	// the team selection event might just be the team from the local storage
	// we do a query one after just to have it from the apollo cache to see changes
	teamSelected$ = this.teamSelectionEvent$.pipe(
		// since
		filter(team => !!team),
		// yes we already have the team but we need a subscription :)
		switchMap(team => this.queryOne(team.id)),
		shareReplay(1)
	);

	hasTeamSelected$ = this.teamSelectionEvent$.pipe(
		map(team => !!team)
	);
	// synchronous version for easy access
	selectedTeamSync: Team;
	static selectedTeamSync: Team;

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
		protected companySrv: CompanyService,
		private http: HttpClient,
	) {
		super(TeamQueries, 'team', customQueries);
		super.useTeamId = false;
	}

	init() {
		// putting a sync version of team
		this.teamSelectionEvent$
			.subscribe(team => {
				this.selectedTeamSync = team;
				TeamService.selectedTeamSync = team;
				GlobalService.teamId = team.id;
			});
		// restoring the previously selected team
		this.restoreSelectedTeam();
		// when logging out let's clear the current selected team
		this.authSrv.signOut$.subscribe(_ => this.resetSelectedTeam());
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return super.create({ companyId: this.companySrv.companySync.id, ...team, });
	}

	update(team: Team) {
		return this.http.patch<Team>(`api/team/${team.id}`, team);
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM, team);
		this._teamSelectionEvent$.next(team);
		return this.teamSelectionEvent$.pipe(
			filter(x => !!x),
			first()
		);
	}

	selectTeam() {
		return this.teamSelected$;
	}


	restoreSelectedTeam() {
		const selectedTeam: Team = this.storage.getItem(SELECTED_TEAM);
		this._teamSelectionEvent$.next(selectedTeam);
	}

	resetSelectedTeam() {
		this.storage.remove(SELECTED_TEAM);
		this._teamSelectionEvent$.next(undefined);
	}

	get idSync() {
		return this.selectedTeamSync.id;
	}

}

