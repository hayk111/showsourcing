import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'selector-text-row-app',
	templateUrl: './selector-text-row.component.html',
	styleUrls: ['./selector-text-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTextRowComponent implements OnInit {

	@Input() text: string;

	constructor() { }

	ngOnInit() {
	}

}
