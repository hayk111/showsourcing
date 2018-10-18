import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoUnsub } from '~utils';

import { OnBoardingService } from '../../services';


@Component({
	selector: 'qrcode-app',
	templateUrl: './qrcode.component.html',
	styleUrls: ['./qrcode.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QRCodeComponent extends AutoUnsub implements OnInit {

	public qrCode: boolean;

	constructor(
		private router: Router,
		private onBoardSrv: OnBoardingService) { super(); }

	ngOnInit() {
		this.qrCode = this.onBoardSrv.getClaim().qrCode;
	}

	updateClaim(qrCode: boolean) {
		this.qrCode = qrCode;
		this.onBoardSrv.updateClaim({ qrCode }).subscribe();
	}

	previousPage() {
		this.router.navigate(['proof-of-identity']);
	}

	nextPage() {
		this.router.navigate(['verification']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
