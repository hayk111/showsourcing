import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input
} from '@angular/core';

@Component({
	selector: 'notif-header-app',
	templateUrl: './notif-header.component.html',
	styleUrls: ['./notif-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifHeaderComponent implements OnInit {
	@Input() fullScreen = false;

	constructor() {}

	ngOnInit() {}
}
