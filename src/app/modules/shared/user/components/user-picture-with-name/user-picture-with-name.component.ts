import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../store/model/entities/user.model';

@Component({
	selector: 'user-picture-with-name-app',
	templateUrl: './user-picture-with-name.component.html',
	styleUrls: ['./user-picture-with-name.component.scss']
})
export class UserPictureWithNameComponent implements OnInit {
	@Input() user: User;

	constructor() { }

	ngOnInit() {
	}

}
