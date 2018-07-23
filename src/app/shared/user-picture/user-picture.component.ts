import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DEFAULT_USER_IMG } from '~utils/constants';
import { AppImage } from '~models';

@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPictureComponent {
	@Input() size: number;
	@Input() border = false;
	@Input() image;
}
