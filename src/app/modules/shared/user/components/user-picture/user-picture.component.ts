import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent implements OnInit {
	static DEFAULT_IMG = 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg';
	private _url;

	constructor() { }

	ngOnInit() {
	}

	@Input()
	set url(v: string) {
		this._url = v;
	}

	get url() {
		return this._url || UserPictureComponent.DEFAULT_IMG;
	}

}
