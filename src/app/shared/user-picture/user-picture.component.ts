import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DEFAULT_NO_IMG } from '~utils/constants.const';

@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex'
	}
})
export class UserPictureComponent {
	@Input() size: number;
	@Input() border = false;


	@Input()
	set url(value: string) {
		this._url = value;
	}

	get url() {
		return this._url || DEFAULT_NO_IMG;
	}
	protected _url: string;

	@Input()
	set spacing(value: string) {
		this._spacing = value;
	}

	get spacing() {
		return this._spacing;
	}
	protected _spacing = 's';

}
