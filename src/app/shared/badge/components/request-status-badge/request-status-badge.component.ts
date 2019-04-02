import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'request-status-badge-app',
	templateUrl: './request-status-badge.component.html',
	styleUrls: ['./request-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStatusBadgeComponent implements OnInit {

	@Input() status: string;
	private _creationDate: Date;
	// it doesnt need to be a date, can be a string, but cannot change type (compiler)
	@Input() set creationDate(creationDate: Date) {
		this._creationDate = new Date(creationDate);
	}
	get creationDate() {
		return this._creationDate;
	}
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
