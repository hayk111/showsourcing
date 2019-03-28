import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'request-badge-app',
	templateUrl: './request-badge.component.html',
	styleUrls: ['./request-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestBadgeComponent implements OnInit {

	@Input() status: string;

	constructor() { }

	ngOnInit() {
	}

	getType() {
		switch (this.status) {
			case 'accepted':
				return 'success';
			case 'toReview':
				return 'primary';
			case 'sentToSupplier':
				return 'accent';
			default:
				return 'secondary';
		}
	}

}
