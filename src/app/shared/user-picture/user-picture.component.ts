import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DEFAULT_USER_IMG } from '~utils/constants';

@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPictureComponent {
	@Input() size: number;
	@Input() border = false;


	@Input()
	set url(value: string) {
		this._url = value;
	}

	get url() {
		return this._url || DEFAULT_USER_IMG;
	}
	protected _url: string;

}
