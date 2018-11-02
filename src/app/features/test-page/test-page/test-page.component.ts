import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '~models';
import { CustomField } from '~shared/dynamic-forms/models';
import * as Isotope from 'isotope-layout';

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
	test = 'lol';
	iso: any;
	element: any;

	constructor() { }

	ngOnInit() {
		this.element = document.querySelector('.grid');

		this.iso = new Isotope(this.element, {
			itemSelector: '.element-item'
		});
	}

	doThis(event: any) {
		const filter = event.target.dataset['filter'];
		console.log(filter);
		this.iso.arrange({ filter });
	}
}
