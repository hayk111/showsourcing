import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../store/model/product.model';

@Component({
	selector: 'basic-info-text-info-app',
	templateUrl: './basic-info-text-info.component.html',
	styleUrls: ['./basic-info-text-info.component.scss']
})
export class BasicInfoTextInfoComponent implements OnInit {
	@Input() product: Product;
	constructor() { }

	ngOnInit() {
	}

}
