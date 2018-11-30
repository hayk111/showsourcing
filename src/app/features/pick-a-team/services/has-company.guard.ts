import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { CompanyService } from '~entity-services/company/company.service';
import { Observable } from 'rxjs';
import { LogColor, log } from '~utils';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HasCompanyGuard implements CanActivate, CanActivateChild {

	constructor(private companySrv: CompanyService, private location: Location, private router: Router) { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.companySrv.selectAll().pipe(
			tap(d => log.debug('%c hasTeamGuard', LogColor.GUARD, d)),
			map(companies => companies.length > 0),
			tap(hasTeam => this.redirect(hasTeam, route, state))
		);
	}

	redirect(hasTeam: boolean, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!hasTeam) {
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['user', 'create-a-company'], { queryParams: { returnUrl } });
		}
	}
}
