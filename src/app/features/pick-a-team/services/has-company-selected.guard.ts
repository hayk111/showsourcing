import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { CompanyService } from '~entity-services/company/company.service';
import { LogColor, log } from '~utils';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HasCompanySelectGuard implements CanActivate, CanActivateChild {

	constructor(private companySrv: CompanyService, private location: Location, private router: Router) { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.companySrv.hasCompany$.pipe(
			tap(d => log.debug('%c hasCompanySelectedGuard', LogColor.GUARD, d)),
			tap(hasCompany => this.redirect(hasCompany, route, state))
		);
	}

	redirect(hasCompany: boolean, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!hasCompany) {
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['user', 'pick-a-company'], { queryParams: { returnUrl } });
		}
	}
}
