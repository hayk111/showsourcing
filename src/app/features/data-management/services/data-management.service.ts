import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataManagementQueries } from '~features/data-management/services/data-management.queries';
import { ERM, ReadProperty } from '~models';
import { CategoryService, EventService, ProductService, SupplierService } from '~shared/global-services';

@Injectable()
export class DataManagementService {

	constructor(
		private categorySrv: CategoryService,
		private supplierSrv: SupplierService,
		private productSrv: ProductService,
		private eventSrv: EventService) { }

	/** type comes from the URL of the current page */
	selectItems(type: ReadProperty): Observable<any[]> {
		switch (type) {
			case ERM.CATEGORY:
				return this.categorySrv.selectAll(DataManagementQueries.selectCategories);

			case ERM.SUPPLIER_TAG:
				return this.supplierSrv.selectAll(DataManagementQueries.selectSupplierTags);

			case ERM.PRODUCT_TAG:
				return this.productSrv.selectAll(DataManagementQueries.selectProductTags);

			case ERM.EVENT:
				return this.eventSrv.selectAll(DataManagementQueries.selectEvents);

			default:
				break;
		}
	}

	/** type comes from the URL of the current page */
	createItem(type: ReadProperty, item: any) {
		switch (type) {
			case ERM.CATEGORY:
				return this.categorySrv.update(item);

			case ERM.SUPPLIER_TAG:
				return this.supplierSrv.update(item);

			case ERM.PRODUCT_TAG:
				return this.productSrv.update(item);

			case ERM.EVENT:
				return this.eventSrv.update(item);

			default:
				break;
		}
	}

	/** type comes from the URL of the current page */
	updateItem(type: ReadProperty, item: any) {
		switch (type) {
			case ERM.CATEGORY:
				return this.categorySrv.update(item);

			case ERM.SUPPLIER_TAG:
				return this.supplierSrv.update(item);

			case ERM.PRODUCT_TAG:
				return this.productSrv.update(item);

			case ERM.EVENT:
				return this.eventSrv.update(item);

			default:
				break;
		}
	}

	/** type comes from the URL of the current page */
	deleteItem(type: ReadProperty, item: any): Observable<any> {
		switch (type) {
			case ERM.CATEGORY:
				return this.categorySrv.delete(item);

			case ERM.SUPPLIER_TAG:
				return this.supplierSrv.delete(item);

			case ERM.PRODUCT_TAG:
				return this.productSrv.delete(item);

			case ERM.EVENT:
				return this.eventSrv.delete(item);

			default:
				break;
		}
	}
}
