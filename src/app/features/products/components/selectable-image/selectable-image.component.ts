import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_PRODUCT_ICON } from '~utils/constants';

@Component({
	selector: 'selectable-image-app',
	templateUrl: './selectable-image.component.html',
	styleUrls: ['./selectable-image.component.scss'],
})
export class SelectableImageComponent implements OnInit {
	@Input() url: string;
	@Input() selected: string;
	@Input() showOverlay: boolean;
	@Input() imgCount: number;
	@Output() vote = new EventEmitter<number>();
	@Output() open = new EventEmitter();
	@Output() trash = new EventEmitter();
	@Output() select = new EventEmitter();
	@Output() unselect = new EventEmitter();

	defaultImg = DEFAULT_PRODUCT_ICON;

	constructor() { }

	ngOnInit() { }

	public getURL() {
		return 'url(' + this.url + ')';
	}
}
