import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
	selector: 'tab-app',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
	active = false;
	@Input() title = '';

	constructor() { }

	ngOnInit() {
	}

}
