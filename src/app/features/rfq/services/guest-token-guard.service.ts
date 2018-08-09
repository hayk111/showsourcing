import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { AccessTokenState, TokenService } from '~features/auth';

@Injectable({
	providedIn: 'root'
})
export class GuestTokenGuard implements CanActivate, CanActivateChild {

	constructor(private tokenSrv: TokenService) { }

	canActivate(route: ActivatedRouteSnapshot) {
		return this.tokenSrv.getGuestAccessToken(route.params.token).pipe(
			map(token => !!token)
		);
	}

	canActivateChild(route: ActivatedRouteSnapshot) {
		return this.canActivate(route);
	}
}
