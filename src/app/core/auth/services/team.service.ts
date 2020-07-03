import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter, first, map, shareReplay, tap, switchMap } from 'rxjs/operators';
import { api, Team, client } from 'showsourcing-api-lib';
import { LocalStorageService } from '~core/local-storage';
import { AuthenticationService } from './authentication.service';
import { CompanyService } from './company.service';

// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService {

	/** event the team selected at the moment of the selection */
	private _teamSelected$ = new ReplaySubject<Team>(1);
	/** value saved in local storage */
	private storedSelection: Team;

	teamSelected$ = this._teamSelected$.pipe(
		shareReplay(1)
	);

	hasTeamSelected$ = this._teamSelected$.pipe(
		map(team => !!team)
	);
	// synchronous version for easy access
	static teamSelected: Team;
	private _teams$ = new ReplaySubject<Team[]>(1);
	teams$ = this._teams$.asObservable();
	teams = [];

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
		protected companySrv: CompanyService,
	) {	}

	init() {
		this.restoreSelectedTeam();
		this.companySrv.company$.pipe(
			filter(company => !!company)
		).subscribe(company => this._teams$.next(company.teams));
		// when logging out let's clear the current selected team
		this.teams$.subscribe(teams => this.onTeams(teams));
		// putting a sync version of team
		this._teamSelected$
		.subscribe(team => {
			TeamService.teamSelected = team;
			if (team)
				client.setTeam(team);
		});
		this.authSrv.signOut$.subscribe(_ => this.resetSelectedTeam());
	}

	private onTeams(teams) {
		this.teams = teams;
		if (!this.storedSelection) {
			return;
		}
		const preselected = (teams || []).find(team => team.id === this.storedSelection.id);
		if (preselected) {
			this._teamSelected$.next(preselected);
		} else {
			this._teamSelected$.next(undefined);
		}
	}

	/** creates a team and waits for it to be valid */
	create(teamName: string): Observable<any> {
		const companyId = this.companySrv.companySync.id;
		return api.Team.create(companyId, teamName, 'BUYER').pipe(
			tap(d => { debugger; }),
			switchMap(team => this.pickTeam(team))
		);
	}

	update(team: Team): Observable<any> {
		// return api.Team.update([{ companyId: this.companySrv.companySync.id, ...team } as any]);
		throw Error('not implemented');
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM, team);
		this._teamSelected$.next(team);
		return this.teamSelected$.pipe(
			filter(x => !!x),
			first()
		);
	}

	restoreSelectedTeam() {
		const storedSelection: Team = this.storage.getItem(SELECTED_TEAM);
		this.storedSelection = storedSelection;
	}

	resetSelectedTeam() {
		this.storage.remove(SELECTED_TEAM);
		this._teamSelected$.next(undefined);
	}

}

