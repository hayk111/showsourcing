import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'card-footer-app',
	templateUrl: './card-footer.component.html',
	styleUrls: ['./card-footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.right]': 'align == "right"',
		'[class.left]': 'align == "left"'
	}
})
export class CardFooterComponent implements OnInit {
	@Input() align: 'left' | 'right' = 'right';

	constructor() { }

	ngOnInit() {
	}

}
