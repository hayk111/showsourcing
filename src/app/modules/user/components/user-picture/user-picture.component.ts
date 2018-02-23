import { Component, OnInit, Input } from '@angular/core';
import { DEFAULT_NO_IMG } from '../../../../utils/constants.const';

@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent implements OnInit {
	private _url;

	constructor() { }

	ngOnInit() {
	}

	@Input()
	set url(v: string) {
		this._url = v;
	}

	get url() {
		return this._url || DEFAULT_NO_IMG;
	}

}
