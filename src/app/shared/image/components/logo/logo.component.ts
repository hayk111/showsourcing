import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppImage } from '~models';

@Component({
	selector: 'logo-app',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
	@Input() logo: AppImage;
	@Input() type: string;
	@Input() size = 's';

	constructor() { }

}
