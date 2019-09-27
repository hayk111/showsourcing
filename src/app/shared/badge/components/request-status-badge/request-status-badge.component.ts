import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestStatus } from '~models';


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
				case RequestStatus.REPLIED:
					return 'primary';
				case RequestStatus.VALIDATED:
					return 'success';
				case RequestStatus.CANCELED:
				case RequestStatus.ERROR:
				case RequestStatus.REFUSED:
					return 'warn';
				default:
					return 'third';
			}
		} else {
			switch (this.status) {
				case RequestStatus.PENDING:
				case RequestStatus.SENT:
				case RequestStatus.RESENT:
					return this.creationDate.getTime() < this.twoWeeksAgo.getTime() ? 'accent' : 'primary';
				case RequestStatus.REPLIED:
				case RequestStatus.VALIDATED:
					return 'success';
				case RequestStatus.CANCELED:
				case RequestStatus.ERROR:
				case RequestStatus.REFUSED:
					return 'warn';
				default:
					return 'third';
			}
		}
	}
}
