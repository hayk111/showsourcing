import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, first, map, shareReplay, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { EntityName, Team } from '~core/erm/models';
import { ApiService } from '~core/erm3/services/api.service';
import { LocalStorageService } from '~core/local-storage';
import { CompanyService } from './company.service';



// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService {

	private queryAll = this.apiSrv.queryAll(EntityName.TEAM);
	hasTeam$ = this.queryAll.data$.pipe(map(teams => teams.length > 0));
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
		switchMap(team => this.apiSrv.queryOne(EntityName.TEAM, team.id)),
		shareReplay(1)
	);

	hasTeamSelected$ = this.teamSelectionEvent$.pipe(
		map(team => !!team)
	);
	// synchronous version for easy access
	selectedTeamSync: Team;
	static selectedTeamSync: Team;
	static teamId: string;

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
		protected companySrv: CompanyService,
		protected apiSrv: ApiService
	) {	}

	init() {
		// putting a sync version of team
		this.teamSelectionEvent$
			.subscribe(team => {
				this.selectedTeamSync = team;
				TeamService.selectedTeamSync = team;
				if (team)
					TeamService.teamId = team.id;
			});
		// restoring the previously selected team
		this.restoreSelectedTeam();
		// when logging out let's clear the current selected team
		this.authSrv.signOut$.subscribe(_ => this.resetSelectedTeam());
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return this.apiSrv.create(EntityName.TEAM, { companyId: this.companySrv.companySync.id, ...team })
			.pipe(switchMap(_ => this.queryAll.refetch()));
	}

	update(team: Team) {
		return this.apiSrv.update(EntityName.TEAM, { companyId: this.companySrv.companySync.id, ...team });
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

