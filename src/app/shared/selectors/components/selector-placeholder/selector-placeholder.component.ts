import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'selector-placeholder-app',
	templateUrl: './selector-placeholder.component.html',
	styleUrls: ['./selector-placeholder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPlaceholderComponent implements OnInit {

	@Input() name: string;
	@Input() placeholder: string;
	@Input() hasArrow = true;

	constructor() { }

	ngOnInit() {
	}

}
