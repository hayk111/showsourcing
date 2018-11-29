import { CanActivate, CanActivateChild, Router } from '@angular/router';
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

	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.companySrv.selectAll().pipe(
			tap(d => log.debug('%c hasTeamGuard', LogColor.GUARD, d)),
			map(companies => companies.length > 0),
			tap(hasTeam => this.redirect(hasTeam))
		);
	}

	redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['user', 'create-a-company'], { queryParams: { returnUrl: this.location.path() } });
		}
	}
}
