import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

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
	@Input() paddingSide: 'ms' | 'l' = 'ms';
	constructor() { }

	ngOnInit() {
	}



}
