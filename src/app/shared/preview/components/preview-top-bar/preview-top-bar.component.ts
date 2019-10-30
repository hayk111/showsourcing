import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'preview-top-bar-app',
	templateUrl: './preview-top-bar.component.html',
	styleUrls: ['./preview-top-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTopBarComponent implements OnInit {

	@Output() expand = new EventEmitter<null>();
	@Output() closed = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
