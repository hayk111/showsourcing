import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment, SupplierClaim } from '~models';

@Component({
	selector: 'congratulations-app',
	templateUrl: './congratulations.component.html',
	styleUrls: ['./congratulations.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CongratulationsComponent implements OnInit {
	supplierClaim: SupplierClaim;

	constructor(private router: Router) { }

	ngOnInit() {
	}

	onSubmit() {
		window.open('https://web.showsourcing.com', '_self');
	}
}
