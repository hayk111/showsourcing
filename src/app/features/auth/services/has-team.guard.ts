import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { TeamService } from '~core/auth';
import { log, LogColor } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuard implements CanActivate, CanActivateChild {

	constructor(private teamSrv: TeamService, private router: Router) { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamSrv.teams$.pipe(
			map((teams: any[]) => teams.length > 0),
			tap(hasTeam => this.redirect(hasTeam, route, state))
		);
	}

	redirect(hasTeam: boolean, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		log.debug(`has team guard -> ${hasTeam}`);
		if (!hasTeam) {
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['auth', 'user', 'create-a-team'], { queryParams: { returnUrl } });
		}
	}

}
