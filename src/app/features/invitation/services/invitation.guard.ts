import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class InvitationGuard implements CanActivateChild {

	constructor() { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		// const teamClientStatus$ = this.apolloState.getClientStatus(Client.TEAM);
		// const centralClientStatus$ = this.apolloState.getClientStatus(Client.CENTRAL);
		// // we only want the loader to appear when the team client and user client is not pending
		// // TODO (michael & cedric) why is this in a guard ?
		// const teamClientSet$ = teamClientStatus$.pipe(
		// 	filter(status => status !== ClientStatus.PENDING));
		// return combineLatest(
		// 	teamClientSet$,
		// 	centralClientStatus$,
		// 	_ => true
		// );

		return true;
	}
}
