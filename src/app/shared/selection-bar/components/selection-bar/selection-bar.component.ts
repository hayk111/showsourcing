import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { selectionBarAnimation } from '~shared/selection-bar/animation/selection-bar.animation';

@Component({
	selector: 'selection-bar-app',
	templateUrl: './selection-bar.component.html',
	styleUrls: ['./selection-bar.component.scss'],
	// commented because selection isn't currently immutable but it should be
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		selectionBarAnimation
	],
	host: {
		class: 'z-2'
	}
})
export class SelectionBarComponent implements OnInit {
	@Input() selection: Map<string, boolean>;
	@Input() isShown = false;
	@Output() close = new EventEmitter();

	constructor() { }

	ngOnInit() { }

}
