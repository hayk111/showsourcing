import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'verification-app',
	templateUrl: './verification.component.html',
	styleUrls: ['./verification.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationComponent extends TrackingComponent implements OnInit {
	constructor(private router: Router) {
		super();
	}

	public data = {
		'name': 'Bussiness name',
		'address': '3 rue de Venise, 69100 Villeurbane',
		'type': 'Manufacturer',
		'category': ['Watch', 'Jeweery'],
		'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'attachments': [
			new Attachment('file 1', 15464),
			new Attachment('file 2', 534873),
			new Attachment('file 3', 654564),
			new Attachment('file 4', 131321),
			new Attachment('file 5', 85454)]
	}
	ngOnInit() {
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
