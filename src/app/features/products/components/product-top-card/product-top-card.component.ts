import { Component, OnInit, Input } from '@angular/core';
import { HostBinding } from '@angular/core';

@Component({
	selector: 'product-top-card-app',
	templateUrl: './product-top-card.component.html',
	styleUrls: ['./product-top-card.component.scss']
})
export class ProductTopCardComponent implements OnInit {
	@Input() product;
	constructor() { }

	ngOnInit() {
	}

}
