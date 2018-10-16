import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '~models';
import { SupplierFeatureService } from '~features/on-boarding/services/supplier-feature.service';

@Injectable({ providedIn: 'root' })
export class SearchFeatureService {

	constructor(private supplierSrv: SupplierFeatureService) { }

	search(search: string): Observable<Supplier[]> {
		return this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${search}"` });
	}
}
