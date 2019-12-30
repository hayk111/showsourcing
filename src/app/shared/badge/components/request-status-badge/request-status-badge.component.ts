import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RequestStatus, StatusUtils } from '~utils';


@Component({
	selector: 'request-status-badge-app',
	templateUrl: './request-status-badge.component.html',
	styleUrls: ['./request-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStatusBadgeComponent {

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
	@Input() size: 's' | 'm' | 'l' = 'm';

	statusUtils = StatusUtils;

	constructor() { }

}
