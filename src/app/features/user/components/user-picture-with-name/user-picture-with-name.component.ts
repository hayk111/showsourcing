import { Component, OnInit, Input } from '@angular/core';
import { User } from '~user';

@Component({
	selector: 'user-picture-with-name-app',
	templateUrl: './user-picture-with-name.component.html',
	styleUrls: ['./user-picture-with-name.component.scss']
})
export class UserPictureWithNameComponent {
	@Input() user: User;
	@Input() size: number;
	@Input() border: boolean;

	constructor() { }



}
