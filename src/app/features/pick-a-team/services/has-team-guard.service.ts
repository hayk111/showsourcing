import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TeamService } from '~shared/global-services';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuard implements CanActivate, CanActivateChild {


	constructor(private teamSrv: TeamService, private router: Router) { }

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamSrv.hasTeam$.pipe(
			filter(d => d !== null),
		);
	}

}
