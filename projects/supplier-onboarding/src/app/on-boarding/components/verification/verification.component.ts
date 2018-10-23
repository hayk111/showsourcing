import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierClaim } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

import { OnBoardingService } from '../../services';

@Component({
	selector: 'verification-app',
	templateUrl: './verification.component.html',
	styleUrls: ['./verification.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationComponent extends TrackingComponent implements OnInit {
	supplierClaim: SupplierClaim;
	constructor(
		private router: Router,
		private onBoardSrv: OnBoardingService) {
		super();
	}

	ngOnInit() {
		this.supplierClaim = this.onBoardSrv.getClaim();
	}

	previousPage() {
		this.router.navigate(['qrcode']);
	}

	nextPage() {
		this.router.navigate(['congratulations']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
