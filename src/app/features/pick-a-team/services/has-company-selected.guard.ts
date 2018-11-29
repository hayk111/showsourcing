import { CanActivate, CanActivateChild, Router } from '@angular/router';
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

	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.companySrv.hasCompany$.pipe(
			tap(d => log.debug('%c hasCompanySelectedGuard', LogColor.GUARD, d)),
			tap(hasCompany => this.redirect(hasCompany))
		);
	}

	redirect(hasCompany: boolean) {
		if (!hasCompany) {
			this.router.navigate(['user', 'pick-a-company'], { queryParams: { returnUrl: this.location.path() } });
		}
	}
}
