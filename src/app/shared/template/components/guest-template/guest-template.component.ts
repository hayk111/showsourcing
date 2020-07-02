import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { state } from 'showsourcing-api-lib';

@Component({
	selector: 'guest-template-app',
	templateUrl: './guest-template.component.html',
	styleUrls: ['./guest-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestTemplateComponent implements OnInit {
	auth$: Observable<boolean>;

	constructor(
		private authSrv: AuthenticationService,
	) { }

	ngOnInit() {
		this.auth$ = state.auth$.pipe(
			map(authState => authState === 'AUTHENTICATED')
		);
	}

	logout() {
		console.log('loggin out');
		this.authSrv.signOut();
	}
}
