import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerAnimation } from '~shared/template/components/animation';

@Component({
	selector: 'template-app',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss'],
	animations: [
		routerAnimation
	]
})
export class TemplateComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	/**
	 * Notifies the service we have reached the bottom of the page,
	 *
	 * This is used in some pages to load content
	 */
	onBottomReached() {

	}

}
