import { Apollo } from 'apollo-angular';
import { UserService } from '~global-services';
import { GlobalService, GlobalServiceInterface } from '~global-services/_global/global.service';
import { GlobalQueries } from '~global-services/_global/global-queries.class';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectParamsConfig } from '~global-services/_global/select-params';
import { ListQuery } from '~global-services/_global/list-query.interface';
import { EntityWithAudit } from '~models';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~shared/apollo';

/**
 * Same as global service but adds an audit (created by, last updated date etc)
 */
export class GlobalWithAuditService<T extends EntityWithAudit<any>> extends GlobalService<T> implements GlobalServiceInterface<T> {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected fields: GlobalQueries,
		protected sing: string,
		protected plural: string,
		protected userSrv: UserService
	) {
		super(apollo, apolloState, fields, sing, plural);
	}

	/**
	 * @inheritDoc
	 * when using getList we want items that are not deleted
	 */
	getListQuery(paramsConfig: SelectParamsConfig, fields?: string | string[], client?: Client): ListQuery<T> {
		const result = super.getListQuery(paramsConfig, fields, client);
		result.items$ = result.items$.pipe(
			map(items => items.filter(item => !item.deleted))
		);
		return result;
	}

	/** @inheritDoc
	 * Updates on entity with an audit will add properties needed by the backend
	 */
	update(entity: any, fields?: string | string[], client?: Client) {
		entity.lastUpdatedBy = { id: this.userSrv.userSync.id };
		entity.lastUpdatedDate = '' + new Date();
		return super.update(entity, fields, client);
	}

	/** @inheritDoc
	 * create on entity with an audit will add properties needed by the backend
	 */
	create(entity: any, fields?: string | string[], client?: Client) {
		entity.createdBy = { id: this.userSrv.userSync.id };
		entity.creationDate = '' + new Date();
		entity.lastUpdatedBy = { id: this.userSrv.userSync.id };
		entity.lastUpdatedDate = '' + new Date();
		return super.create(entity, fields, client);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	delete(id: string, client?: Client) {
		return this.update({ id, deleted: true }, 'deleted', client);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	deleteMany(ids: string[], client?: Client) {
		return forkJoin(ids.map(id => this.delete(id, client)));
	}
}
