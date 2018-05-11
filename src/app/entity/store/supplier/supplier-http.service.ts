import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, scan, takeUntil, takeWhile, concatMap, expand } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { Patch, ApiParams } from '~entity/utils';

import { User } from '~user';
import { UserService } from '~app/features/user/services';
import { Observable ,  of ,  Subject ,  BehaviorSubject ,  range ,  EMPTY as empty } from 'rxjs';
import { Supplier } from '~app/entity/store/supplier/supplier.model';

@Injectable()
export class SupplierHttpService {
	take = 100;
	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) { }

	/** loads all suppliers */
	loadAll() {
		// we can only load 100 suppliers at a time so we gonna paginate. We do know that there won't be 1000000 pages of results though.
		// so we can range from 0 to 1000000 and stop when we have all the suppliers
		return range(0, 1000000).pipe(
			concatMap(page => this.http.get(`api/team/${this.userSrv.teamId}/supplier?drop=${page * this.take}&take=${this.take}`)),
			map((r: any) => r.elements),
			takeWhile((suppliers: Array<Supplier>) => (suppliers.length !== 0)),
			map(suppliers => this.standardize(suppliers)),
		);
	}

	/** loads a subset of suppliers given the params */
	loadAsync(params: ApiParams) {
		params = { ...params, base: ERM.team, target: ERM.supplier, recurring: true };
		return this.entitySrv.load(params).pipe(
			map((r: any) => r.elements),
		);
	}

	private standardize(suppliers: Array<any>) {
		suppliers.forEach(supplier => {
			// putting advanced infos onto the supplier itself
			const infos = Object.entries(supplier.advancedInfos);
			infos.forEach(([k, v]) => supplier[k] = v);
			// adding categoryIds and tagIds
			supplier.categoryIds = supplier.categories.map(cat => cat.id);
			supplier.tagIds = supplier.tags.map(tag => tag.id);
		});
		return suppliers;
	}

	loadById(id: string) {
		return this.http.get(`api/supplier/${id}`);
	}

	create(supplier) {
		return this.http.post(`api/team/${this.userSrv.teamId}/supplier`, { name: supplier.name });
	}

	loadProductCount() {
		return this.userSrv.user$.pipe(
			switchMap((user: User) => this.http.get(`api/team/${user.currentTeamId}/countProdsBySupplier`)),
			map((r: any) => r.items)
		);
	}

	addTag({ tag, supplierId }): Observable<any> {
		return this.http.put(`api/supplier/${supplierId}/tag/${tag.id}`, {});
	}

	removeTag({ tag, supplierId }): Observable<any> {
		return this.http.delete(`api/supplier/${supplierId}/tag/${tag.id}`, {});
	}

	createTag({ tag, supplierId }): Observable<any> {
		return this.http.post(`api/team/${this.userSrv.teamId}/tag`, { name: tag.name, itemType: 'Product' });
	}

	addCategory({ category, supplierId }): Observable<any> {
		return this.http.put(`api/supplier/${supplierId}/productCategory/${category.id}`, {});
	}

	removeCategory({ category, supplierId }): Observable<any> {
		return this.http.delete(`api/supplier/${supplierId}/productCategory/${category.id}`, {});
	}

	createCategory({ category, supplierId }): Observable<any> {
		return this.http.post(`api/team/${this.userSrv.teamId}/category`, { name: category.name, metaCategory: 'meta-category' });
	}
}
