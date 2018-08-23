import { Apollo } from 'apollo-angular';
import { UserService } from '~global-services';
import { GlobalService, GlobalServiceInterface } from '~global-services/_global/global.service';
import { GlobalQueries } from '~global-services/_global/global-queries.class';
import { forkJoin, Observable } from 'rxjs';

/**
 * Same as global service but adds an audit (created by, last updated date etc)
 */
export class GlobalWithAuditService<T> extends GlobalService<T> implements GlobalServiceInterface<T> {

	constructor(
		protected apollo: Apollo,
		protected fields: GlobalQueries,
		protected sing: string,
		protected plural: string,
		protected userSrv: UserService
	) {
		super(apollo, fields, sing, plural);
	}

	// /**
	//  *
	//  * @param id
	//  * @param fields
	//  * @param client
	//  */
	// selectOne(id: string, fields?: string | string[], client?: string): Observable<T> {
	// 	throw Error('not implemented yet')
	// }

	/**
	 * Updates on entity with an audit will add properties needed by the backend
	 */
	update(entity: any, client?: string) {
		entity.lastUpdatedBy = { id: this.userSrv.userSync.id };
		entity.lastUpdatedDate = '' + new Date();
		return super.update(entity, client);
	}

	/**
	 * create on entity with an audit will add properties needed by the backend
	 */
	create(entity: any, client?: string) {
		entity.createdBy = { id: this.userSrv.userSync.id };
		entity.creationDate = '' + new Date();
		entity.lastUpdatedBy = { id: this.userSrv.userSync.id };
		entity.lastUpdatedDate = '' + new Date();
		return super.create(entity, client);
	}

	/**
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	delete(id: string, client?: string) {
		return this.update({ id, deleted: true }, client);
	}

	/**
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	deleteMany(ids: string[], client?: string) {
		return forkJoin(ids.map(id => this.delete(id, client)));
	}

}