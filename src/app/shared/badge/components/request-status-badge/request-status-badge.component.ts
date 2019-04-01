import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'request-status-badge-app',
	templateUrl: './request-status-badge.component.html',
	styleUrls: ['./request-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStatusBadgeComponent implements OnInit {

	@Input() status: string;
	@Input() creationDate: Date;
	// wether we are on team page or supplier page
	@Input() isTeam = true;

	/** magic number for 2 weeks in miliseconds */
	twoWeeks = 12096e5;
	twoWeeksAgo = (new Date(+new Date - this.twoWeeks));

	constructor() { }

	ngOnInit() {
	}

	getType() {
		if (this.isTeam) {
			switch (this.status) {
				case 'sent':
					return this.creationDate.getTime() > this.twoWeeksAgo.getTime() ? 'accent' : 'secondary';
				case 'opened':
					return 'primary';
				case 'replied':
					return 'success';
				default:
					return 'secondary';
			}
		} else {
			switch (this.status) {
				case 'sent':
				case 'opened':
					return this.creationDate.getTime() > this.twoWeeksAgo.getTime() ? 'accent' : 'secondary';
				case 'replied':
					return 'success';
				default:
					return 'secondary';
			}
		}
	}
}
