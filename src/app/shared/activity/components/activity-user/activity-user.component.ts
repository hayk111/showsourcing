import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '~models/user.model';

@Component({
	selector: 'activity-user-app',
	templateUrl: './activity-user.component.html',
	styleUrls: ['./activity-user.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex'
	}
})
export class ActivityUserComponent implements OnInit {
	@Input() user: User;
	@Input() action: string;
	@Input() time: string;

	constructor() { }

	ngOnInit() {
	}

}
