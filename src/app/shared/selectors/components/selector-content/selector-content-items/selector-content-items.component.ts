import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'selector-content-items-app',
	templateUrl: './selector-content-items.component.html',
	styleUrls: ['./selector-content-items.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorContentItemsComponent implements OnInit {

	@Input() pending = false;

	constructor() { }

	ngOnInit() {
	}

}
