import {
	Component,
	OnInit,
	EventEmitter,
	Output
} from '@angular/core';

@Component({
	selector: 'notif-header-app',
	templateUrl: './notif-header.component.html',
	styleUrls: ['./notif-header.component.scss'],
})
export class NotifHeaderComponent implements OnInit {
	@Output() close = new EventEmitter<void>();

	constructor() {}

	ngOnInit() {}
}
