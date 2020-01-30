import { Observable } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { EntityWithAudit } from '~core/erm/models';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';
import { GlobalService, GlobalServiceInterface } from '~core/erm/services/_global/global.service';

/**
 * Same as global service but adds an audit (created by, last updated date etc)
 */
export class GlobalWithAuditService<T extends EntityWithAudit<any>> extends GlobalService<T> implements GlobalServiceInterface<T> {

	constructor(
		protected fields: GlobalQueries,
		protected sing: string,
		protected plural: string,
		protected userSrv: UserService,
		protected analyticsSrv?: AnalyticsService,
	) {
		super(fields, sing, plural, analyticsSrv);
	}


	/** @inheritDoc
	 * Updates on entity with an audit will add properties needed by the backend
	 */
	update(entity: any, fields?: string, isOptimistic: boolean = true): Observable<T> {
		throw Error('not implemented');
		// entity.lastUpdatedBy = {
		// 	id: this.userSrv.userId,
		// 	firstName: this.userSrv.userSync.firstName,
		// 	lastName: this.userSrv.userSync.lastName,
		// 	__typename: 'User'
		// };
		// entity.lastUpdatedDate = '' + new Date();
		// return super.update(entity, client, fields, isOptimistic);
	}

	/** @inheritDoc
	 * Updates on entities with an audit will add properties needed by the backend
	 */
	updateMany(entities: any[], fields?: string): Observable<T[]> {
		throw Error('not implemented');
		// entities.forEach(entity => {
		// 	entity.lastUpdatedBy = { id: this.userSrv.userId, __typename: 'User' };
		// 	entity.lastUpdatedDate = '' + new Date();
		// });
		// return super.updateMany(entities, client, fields);
	}

	/** @inheritDoc
	 * create on entity with an audit will add properties needed by the backend
	 */
	create(entity: any): Observable<T> {
		throw Error('not implemented');
		// const user = {
		// 	id: this.userSrv.userId,
		// 	firstName: this.userSrv.userSync.firstName,
		// 	lastName: this.userSrv.userSync.lastName,
		// 	__typename: 'User',
		// };
		// entity.createdBy = user;
		// entity.creationDate = '' + new Date();
		// entity.lastUpdatedBy = user;
		// entity.lastUpdatedDate = '' + new Date();
		// return super.create(entity, client);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	delete(id: string): Observable<T> {
		throw Error('not implemented');

		// return this.update({ id, deleted: true, deletedBy: { id: this.userSrv.userId, __typename: 'User' } }, client);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	deleteMany(ids: string[]): Observable<T[]> {
		throw Error('not implemented');

		// return forkJoin(ids.map(id => this.delete(id, client)));
	}

}
