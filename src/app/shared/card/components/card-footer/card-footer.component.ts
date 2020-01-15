import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'card-footer-app',
	templateUrl: './card-footer.component.html',
	styleUrls: ['./card-footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.right]': 'align == "right"',
		'[class.left]': 'align == "left"',
		'[class.center]': 'align == "center"',
		'[class.border]': 'border'
	}
})
export class CardFooterComponent {

	@Input() align: 'left' | 'right' | 'center' = 'right';
	@Input() border = true;

	constructor() { }

}
