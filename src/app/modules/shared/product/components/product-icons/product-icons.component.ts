import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'product-icons-app',
	templateUrl: './product-icons.component.html',
	styleUrls: ['./product-icons.component.scss']
})
export class ProductIconsComponent implements OnInit {
	@Input() numComments: number;
	@Input() numTasks: number;
	@Input() sample: boolean;

	constructor() { }

	ngOnInit() {
	}

}
