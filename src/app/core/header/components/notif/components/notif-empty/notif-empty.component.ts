import {
	Component,
	OnInit,
	EventEmitter,
	Output
} from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'notif-empty-app',
	templateUrl: './notif-empty.component.html',
	styleUrls: ['./notif-empty.component.scss'],
})
export class NotifEmptyComponent implements OnInit {
	@Output() close = new EventEmitter<void>();

	constructor(public router: Router) { }

	ngOnInit() { }

	redirect() {
		this.close.emit();
		this.router.navigate(['/settings/team/members']);
	}
}
