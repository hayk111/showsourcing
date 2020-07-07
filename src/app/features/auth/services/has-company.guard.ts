import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CompanyService } from '~core/auth';
import { log, LogColor } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class HasCompanyGuard implements CanActivate, CanActivateChild {

	constructor(private companySrv: CompanyService, private router: Router) { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.companySrv.company$.pipe(
			map(company => !!company),
			tap(hasCompany => this.redirect(hasCompany, route, state))
		);
	}

	redirect(hasCompany: boolean, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		log.debug(`has company -> ${hasCompany}`);

		if (!hasCompany) {
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['auth', 'user', 'create-a-company'], { queryParams: { returnUrl } });
		}
	}
}
