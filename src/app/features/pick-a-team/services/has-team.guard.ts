import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { TeamService } from '~global-services';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuard implements CanActivate, CanActivateChild {

	constructor(private teamSrv: TeamService, private location: Location, private router: Router) { }

	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamSrv.selectAll().pipe(
			tap(d => log.debug('%c hasTeamGuard', LogColor.GUARD, d)),
			map(teams => teams.length > 0),
			tap(hasTeam => this.redirect(hasTeam))
		);
	}

	redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['user', 'create-a-team'], { queryParams: { returnUrl: this.location.path() } });
		}
	}

}
