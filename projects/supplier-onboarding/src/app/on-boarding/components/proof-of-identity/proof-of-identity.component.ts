import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from '~models';

@Component({
	selector: 'proof-of-identity-app',
	templateUrl: './proof-of-identity.component.html',
	styleUrls: ['./proof-of-identity.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProofOfIdentityComponent implements OnInit {
	public listFile: Attachment[] = [];

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['account-creation']);
	}

	nextPage() {
		this.router.navigate(['qrcode']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
