import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { TeamService } from '~entity-services';

@Injectable({
	providedIn: 'root'
})
export class HasTeamSelectedGuard implements CanActivate, CanActivateChild {

	constructor(private teamSrv: TeamService, private location: Location, private router: Router) { }

	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamSrv.hasTeamSelected$.pipe(
			tap(d => log.debug('%c hasTeamGuard selected', LogColor.GUARD, d)),
			tap(hasTeam => this.redirect(hasTeam))
		);
	}

	redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['user', 'pick-a-team'], { queryParams: { returnUrl: this.location.path() } });
		}
	}

}
