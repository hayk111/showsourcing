import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { Patch } from '~entity/utils';

import { User } from '~user';
import { UserService } from '~app/features/user/services';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SupplierHttpService {
	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) { }

	load() {
		return this.entitySrv
			.load({ base: ERM.team, target: ERM.supplier, recurring: true })
			.pipe(
				map((r: any) => r.elements),
				map(suppliers => this.standardize(suppliers)),
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
		return this.http.post(`api/team/${this.userSrv.teamId}/supplier`, supplier);
	}

	loadProductCount() {
		return this.userSrv.user$.pipe(
			switchMap((user: User) => this.http.get(`api/team/${user.currentTeamId}/countProdsBySupplier`)),
			map((r: any) => r.items)
		);
	}

	addTag({ tag, supplierId }): Observable<any> {
		return this.http.put(`/api/supplier/${supplierId}/tag/${tag.id}`, {});
	}

	removeTag({ tag, supplierId }): Observable<any> {
		return this.http.delete(`/api/supplier/${supplierId}/tag/${tag.id}`, {});
	}

	createTag({ tag, supplierId }): Observable<any> {
		return this.http.post(`/api/team/${this.userSrv.teamId}/tag`, { name: tag.name, itemType: 'Product' });
	}

	addCategory({ category, supplierId }): Observable<any> {
		return this.http.put(`/api/supplier/${supplierId}/category/${category.id}`, {});
	}

	removeCategory({ category, supplierId }): Observable<any> {
		return this.http.delete(`/api/supplier/${supplierId}/category/${category.id}`, {});
	}

	createCategory({ category, supplierId }): Observable<any> {
		return this.http.post(`/api/team/${this.userSrv.teamId}/category`, { name: category.name, itemType: 'Product' });
	}
}
