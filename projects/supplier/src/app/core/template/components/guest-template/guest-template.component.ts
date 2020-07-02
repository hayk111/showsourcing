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

	constructor(
		private authSrv: AuthenticationService,
	) { }

	ngOnInit() {
		this.auth$ = this.authSrv.authState$.pipe(
			map(state => state.state === AuthStatus.AUTHENTICATED)
		);
	}

	logout() {
		this.authSrv.signOut();
	}
}
