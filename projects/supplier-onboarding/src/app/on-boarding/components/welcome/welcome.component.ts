import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloStateService, ClientStatus } from '~shared/apollo';
import { log } from '~utils';

import { OnBoardingService } from '../../services';

@Component({
	selector: 'welcome-app',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
	pending = true;
	error: string;

	constructor(
		private router: Router,
		private onboardingSrv: OnBoardingService
	) { }

	ngOnInit() {
		this.onboardingSrv.init().subscribe(
			_ => this.pending = false,
			e => this.onError(e)
		);

	}

	checkClientNotReady(status: ClientStatus) {
		if (status === ClientStatus.NOT_READY
			|| status === ClientStatus.ERROR) {
			this.onError(new Error('client not ready'));
		}
	}

	submit() {
		this.router.navigate(['find-business']);
	}

	onError(e: Error) {
		this.error = 'an error happened please refresh and try again';
		log.error(e);
		this.pending = false;
	}
}
