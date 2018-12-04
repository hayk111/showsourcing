import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppImage, User } from '~models';

/**
 * component that accepts either an user or initials and images
 */
@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPictureComponent {
	@Input() size = 32;
	@Input() border = false;
	/** user */
	@Input() set user(user: User) {
		this._user = user;
		if (user) {
			if (user.firstName && user.lastName)
				this._initials = `${user.firstName[0]}${user.lastName[0]}`;

			this._image = user.avatar;
		}

	}
	private _user: User;

	/** initials */
	@Input() set initials(initials: string) {
		this._initials = initials;
	}
	get initials() {
		return this._initials;
	}
	private _initials: string;
	/** image */
	@Input() set image(image: AppImage) {
		this._image = image;
	}
	get image() {
		return this._image;
	}
	private _image: AppImage;

	commonStyle() {
		// This ratio is needed so we don't have to declare each time a font-size, given a circle size
		// case 0: if cercle size = 0, font-size = 2 (initials) this case is imposible (size = 0) but its the base case
		// cercleSize / 4 => for each 4px of growth on cercleSize
		// 2 * => 2px of growth on the fontSize
		// this means that case 0 circleSize = 0, font-size = 2
		// for each4px of groth on the cercle the font-size will increase 2px
		const fontSize = 2 + (2 * (Math.floor(this.size / 4)));
		return {
			'font-size': fontSize + 'px',
			height: this.size + 'px',
			width: this.size + 'px',
			'border-radius': '50%'
		};
	}
}
