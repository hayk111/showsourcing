import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AccessTokenState, TokenService } from '~features/auth';

@Injectable({
	providedIn: 'root'
})
export class GuestTokenGuard implements CanActivate, CanActivateChild {

	constructor(private tokenSrv: TokenService) { }

	canActivate(route: ActivatedRouteSnapshot) {
		return true;
		// return route.params.pipe(
		// 	switchMap((params: any) => this.tokenSrv.getGuestRefreshToken(params.token)),
		// 	switchMap((refreshToken: any) => this.tokenSrv.fetchAccessToken(refreshToken)),
		// 	switchMap(_ => this.tokenSrv.accessToken$),
		// 	map((accessToken: AccessTokenState) => accessToken.guest)
		// );
	}

	canActivateChild(route: ActivatedRouteSnapshot) {
		return this.canActivate(route);
	}
}
