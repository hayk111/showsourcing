import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'user-picture-app',
	templateUrl: './user-picture.component.html',
	styleUrls: ['./user-picture.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPictureComponent {
	@Input() size = 32;
	@Input() border = false;
	@Input() image: AppImage;
}
