import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-selector-test',
	templateUrl: './selector-test.component.html',
	styleUrls: ['./selector-test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTestComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
