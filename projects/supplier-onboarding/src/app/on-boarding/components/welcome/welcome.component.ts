import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { log } from '~utils';

import { OnBoardingService } from '../../services';
import { ApolloStateService, ClientStatus } from '~shared/apollo';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { tap, filter, combineLatest, first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

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
		private srv: OnBoardingService,
		private apolloState: ApolloStateService,
		private cd: ChangeDetectorRef
	) { }

	ngOnInit() {
		const globalReady$ = this.apolloState.getClientStatus(Client.GLOBAL_DATA).pipe(
			tap(status => this.checkClientNotReady(status)),
			filter(status => status === ClientStatus.READY),
			first()
		);

		const boardingReady$ = this.apolloState.getClientStatus(Client.SUPPLIER_ONBOARDING).pipe(
			tap(status => this.checkClientNotReady(status)),
			filter(status => status === ClientStatus.READY),
			first()
		);

		forkJoin(globalReady$, boardingReady$)
			.subscribe(_ => {
				this.pending = false;
				this.cd.markForCheck();
			});
	}

	checkClientNotReady(status: ClientStatus) {
		if (status === ClientStatus.NOT_READY
			|| status === ClientStatus.ERROR) {
			this.onError(new Error('client not ready'));
		}
	}

	submit() {
		this.pending = true;
		this.srv.init().subscribe(
			_ => this.onSuccess(),
			e => this.onError(e)
		);
	}

	onSuccess() {
		this.pending = false;
		this.router.navigate(['find-business']);
	}

	onError(e: Error) {
		this.error = 'an error happened please refresh and try again';
		log.error(e);
		this.pending = false;
	}
}
