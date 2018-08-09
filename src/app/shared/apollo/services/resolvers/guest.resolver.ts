import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { TokenService } from "~features/auth";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class GuestResolver implements Resolve<any> {
	constructor(private tokenSrv: TokenService) { }

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> | Promise<any> | any {
		return this.tokenSrv.getGuestAccessToken(route.params.token);
	}
}
