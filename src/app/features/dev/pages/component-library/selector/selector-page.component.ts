import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~core/erm';
import { ProductService } from '~core/erm';
import { TeamService } from '~core/erm';
import { PropertyOptionsService } from '~shared/selectors/services/property-options.service';

@Component({
	selector: 'selector-page-app',
	templateUrl: './selector-page.component.html',
	styleUrls: ['./selector-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPageComponent implements OnInit {

	entityNames = ['Product', 'Project', 'PropertyOption', 'Category', 'Currency', 'Supplier', 'User', 'Country'];

	product$: Observable<Product>;

	constructor(private propertyOptionSrv: PropertyOptionsService) { }

	ngOnInit() {
		// this.propertyOptionSrv.listPropertyOptions('Color').subscribe(data => {
		// 	console.log('ngOnInit -> data', data);
		// });

		// this.propertyOptionSrv.createPropertyOption({
		// 	type: 'Color',
		// 	value: 'pink'
		// }).subscribe(created => {
		// 	console.log('SelectorPageComponent -> ngOnInit -> created', created);
		// 	this.propertyOptionSrv.deletePropertyOption(created).subscribe(deleted => {
		// 		console.log(deleted);
		// 	});
		// });
	}

	update(item, prop) {
	}

}
