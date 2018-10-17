import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthStatus } from '~features/auth';

@Component({
	selector: 'guest-template-app',
	templateUrl: './guest-template.component.html',
	styleUrls: ['./guest-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestTemplateComponent implements OnInit {
	auth$: Observable<boolean>;
	constructor(private authSrv: AuthenticationService) { }

	ngOnInit() {
		this.auth$ = this.authSrv.authStatus$.pipe(
			map(status => status === AuthStatus.AUTHENTICATED)
		);
	}

	logout() {
		this.authSrv.logout();
	}
}
