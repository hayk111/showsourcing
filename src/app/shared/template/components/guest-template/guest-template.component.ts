import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthStatus } from '~core/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'guest-template-app',
	templateUrl: './guest-template.component.html',
	styleUrls: ['./guest-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestTemplateComponent implements OnInit {
	auth$: Observable<boolean>;
	/** sometimes we don't wanna display the logout button */
	showLogout = true;
	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.auth$ = this.authSrv.authStatus$.pipe(
			map(status => status === AuthStatus.AUTHENTICATED)
		);
		this.showLogout = this.route.snapshot.data.showLogout;
	}

	logout() {
		this.authSrv.logout();
	}
}
