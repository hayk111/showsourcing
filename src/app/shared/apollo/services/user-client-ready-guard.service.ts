import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloService } from '~shared/apollo/services/apollo.service';
import { Observable } from 'rxjs';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';

@Injectable({
	providedIn: 'root'
})
export class UserClientReadyGuardService implements CanActivate, CanActivateChild {

	constructor(private apolloState: ApolloStateService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.userClientReady$;
	}


	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}
