import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'colors-page-app',
	templateUrl: './colors-page.component.html',
	styleUrls: ['./colors-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsPageComponent implements OnInit {
	colors = ['primary', 'secondary', 'accent', 'vibrant', 'warn', 'success'];
	constructor() { }

	ngOnInit() {
	}

}
