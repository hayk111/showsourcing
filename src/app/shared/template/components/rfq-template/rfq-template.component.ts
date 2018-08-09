import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AutoUnsub } from '~utils';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { GuestClientInitializer } from '~shared/apollo';
import { TokenService } from '~features/auth';

@Component({
	selector: 'rfq-template-app',
	templateUrl: './rfq-template.component.html',
	styleUrls: ['./rfq-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfqTemplateComponent extends AutoUnsub implements OnInit {
	@ViewChild('main') mainRef;

	constructor(
		private tokenSrv: TokenService,
		private route: ActivatedRoute,
		private guestInitializer: GuestClientInitializer
	) {
		super();
		debugger;
	}

	ngOnInit() {
		debugger;
		this.guestInitializer.init();
		this.tokenSrv.getGuestAccessToken(this.route.snapshot.params.token).pipe(
			takeUntil(this._destroy$)
		).subscribe();
	}

	onActivate(event) {
		// this.mainRef.nativeElement.scrollIntoView();
		window.scrollTo(0, 0);
	}
}
