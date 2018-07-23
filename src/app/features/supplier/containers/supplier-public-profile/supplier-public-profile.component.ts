import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-public-profile-app',
	templateUrl: './supplier-public-profile.component.html',
	styleUrls: ['./supplier-public-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexCenter flexColumn'
	}
})
export class SupplierPublicProfileComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
