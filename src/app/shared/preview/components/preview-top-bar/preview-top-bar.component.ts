import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'preview-top-bar-app',
	templateUrl: './preview-top-bar.component.html',
	styleUrls: ['./preview-top-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTopBarComponent implements OnInit {

	@Input() canOpen = true;
	@Input() hasOptions = true;
	@Output() opened = new EventEmitter<null>();
	@Output() closed = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
