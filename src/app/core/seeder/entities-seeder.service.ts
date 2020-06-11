import { ApiService } from '~core/erm3';
import { Entity } from '~core/erm3/models/_entity.model';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Typename } from '~core/erm3/typename.type';
import { uuid } from '~utils';

// Descriptor Product
@Injectable({
	providedIn: 'root',
})
export class EntitiesSeederService {
	private _entityTypes: Typename[] = ['Product', 'Project', 'Supplier', 'Sample', 'Task'];

	constructor(private apiSrv: ApiService) {}

	async listEntities(entityType: Typename): Promise<any> {
		return this.apiSrv.listBy(entityType).data$.pipe(first()).toPromise();
	}

	/** delete all WorkflowStatus in current team */
	async deleteAllEntities(): Promise<any> {
		this._entityTypes.forEach(async entityType => {
			const allEntitites = await this.listEntities(entityType);
			await this.apiSrv.deleteMany(entityType, allEntitites).pipe(first()).toPromise();
		});
	}

	async createAllEntities(teamId: string) {
		if (localStorage.getItem('entities-data-seeded-' + teamId)) {
			return;
		}
		localStorage.setItem('entities-data-seeded-' + teamId, 'yes');
		const createdSubscriptions: Promise<any>[] = [];

		this._entityTypes.forEach((entityType, index) => {
			for (let i = 0; i < 100; i++) {
				createdSubscriptions.push(
					this.apiSrv.create(entityType, {
						id: uuid(),
						name: `New ${entityType}-${i}`,
						createdAt: new Date().toISOString(),
						teamId
					}).pipe(first()).toPromise()
				);
			}

		});

		return Promise.all(createdSubscriptions);
	}

}
