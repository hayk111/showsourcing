import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent implements OnInit {
	static DEFAULT_IMG = 'https://visit.nemedic.com/storage/default.jpg';
	@Input() url;

	constructor() { }

	ngOnInit() {
	}

	get src() {
		return this.url || UserPictureComponent.DEFAULT_IMG;
	}

}
