import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'card-title-app',
	templateUrl: './card-title.component.html',
	styleUrls: ['./card-title.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.s]': 'size === "s"',
		'[class.m]': 'size === "m"',
		'[class.l]': 'size === "l"'
	}
})
export class CardTitleComponent {
	@Input() size: 's' | 'm' | 'l' = 'm';
}
