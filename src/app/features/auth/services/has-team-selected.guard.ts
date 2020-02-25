import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TeamService } from '~core/auth/services/team.service';
import { log, LogColor } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class HasTeamSelectedGuard implements CanActivate, CanActivateChild {

	constructor(private teamSrv: TeamService, private router: Router) { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamSrv.hasTeamSelected$.pipe(
			tap(d => log.debug('%c hasTeamSelectedGuard', LogColor.GUARD, d)),
			tap(hasTeam => this.redirect(hasTeam, route, state))
		);
	}

	redirect(hasTeam: boolean, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!hasTeam) {
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['auth', 'user', 'pick-a-team'], { queryParams: { returnUrl } });
		}
	}

}
