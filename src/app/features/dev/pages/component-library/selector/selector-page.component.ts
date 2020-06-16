import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~core/erm';
import { ProductService } from '~core/erm';
import { TeamService } from '~core/erm';
import { PropertyOptionsService } from '~shared/selectors/services/property-options.service';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'selector-page-app',
	templateUrl: './selector-page.component.html',
	styleUrls: ['./selector-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPageComponent implements OnInit {

	entityNames = ['Product', 'Project', 'PropertyOption', 'Category', 'Currency', 'Supplier', 'User', 'Country'];

	product$: Observable<Product>;

	/** ===== STATUS PART ===== */
	statusTypenames = ['Product', 'Task', 'Sample', 'Supplier'];
	typenameSelected: Typename;
	entitySelected: any;
	triggerType: 'badge' | 'button' = 'badge';


	constructor(private propertyOptionSrv: PropertyOptionsService) { }

	ngOnInit() {
		// this.propertyOptionSrv.listPropertyOptions('Color').subscribe(data => {
		// 	console.log('ngOnInit -> data', data);
		// });

		// this.apiSrv.sync('PropertyOption', {
		// 	fetchPolicy: 'cache-and-network'
		// }).data$.subscribe(data => {
		// 	console.log('SelectorPageComponent -> ngOnInit -> data', data);
		// });

		// this.propertyOptionSrv.createPropertyOption({
		// 	type: 'Country',
		// 	value: 'Armenia'
		// }).subscribe(created => {
		// 	console.log('SelectorPageComponent -> ngOnInit -> created', created);
		// 	this.propertyOptionSrv.deletePropertyOption(created).subscribe(deleted => {
		// 		console.log(deleted);
		// 	});
		// });
	}

	update(item, prop) {
	}

	/** ===== STATUS PART ===== */

		selectTypename(typename) {
		this.typenameSelected = typename;
		this.entitySelected = null;
	}

	selectEntity(entity) {
		this.entitySelected = entity;
	}

	selectTrigger(e) {
		this.triggerType = e.target.value;
	}

}
