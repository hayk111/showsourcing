import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DEFAULT_IMG } from '~utils';

@Component({
	selector: 'task-app',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {

	defaultImg = DEFAULT_IMG;
	tempU = { firstName: 'miau', lastName: 'wow' } as any;
	constructor() { }

	ngOnInit() {
	}

	get getStatus() {
		const status = 'pending';
		return status;
	}

}
