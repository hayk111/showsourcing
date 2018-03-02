import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DEFAULT_NO_IMG } from '~utils/constants.const';

@Component({
	selector: 'selectable-image-app',
	templateUrl: './selectable-image.component.html',
	styleUrls: ['./selectable-image.component.scss'],
})
export class SelectableImageComponent implements OnInit {
	@Input() url: string;
	@Input() selected: string;
	@Input() showOverlay: boolean;
	@Output() vote = new EventEmitter<number>();
	@Output() open = new EventEmitter();
	@Output() trash = new EventEmitter();
	@Output() select = new EventEmitter();
	@Output() unselect = new EventEmitter();

	defaultImg = DEFAULT_NO_IMG;

	constructor() {}

	ngOnInit() {}

	public getURL() {
		return 'url(' + this.url + ')';
	}
}
