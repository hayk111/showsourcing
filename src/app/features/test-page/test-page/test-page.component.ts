import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageComponent implements OnInit {
	currency = 'PKR';
	country = ['DZ'];
	harbour = 'Bangkok';
	incoTerm = 'FOB';
	supplier;
	category;
	event;
	tags = [];

	constructor() { }

	ngOnInit() {
	}

}
