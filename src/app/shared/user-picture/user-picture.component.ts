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

	get commonStyle() {
		return {
			height: this.size + 'px',
			width: this.size + 'px',
			'border-radius': '50%'
		};
	}

}
