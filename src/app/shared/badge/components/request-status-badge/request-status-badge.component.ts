import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'request-status-badge-app',
	templateUrl: './request-status-badge.component.html',
	styleUrls: ['./request-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStatusBadgeComponent implements OnInit {

	@Input() status: string;

	constructor() { }

	ngOnInit() {
	}

	getType2() {
		switch (this.status) {
			case 'sent':
				return;
			case 'opened':
				return 'primary';
			case 'replied':
				return 'success';
			default:
				return 'secondary';
		}
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
