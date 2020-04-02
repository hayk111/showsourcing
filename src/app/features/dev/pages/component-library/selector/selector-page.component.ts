import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~core/erm';
import { ProductService } from '~core/erm';
import { TeamService } from '~core/erm';

@Component({
	selector: 'selector-page-app',
	templateUrl: './selector-page.component.html',
	styleUrls: ['./selector-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPageComponent implements OnInit {

	entityNames = ['Product', 'Project', 'Category', 'Currency', 'Supplier', 'User', 'Country'];

	product$: Observable<Product>;

	constructor() { }

	ngOnInit() {}

	update(item, prop) {
	}

}
