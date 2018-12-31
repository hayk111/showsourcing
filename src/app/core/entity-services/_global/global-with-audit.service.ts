import { forkJoin } from 'rxjs';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { UserService } from '~entity-services';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';
import { GlobalService, GlobalServiceInterface } from '~entity-services/_global/global.service';
import { EntityWithAudit } from '~models';

/**
 * Same as global service but adds an audit (created by, last updated date etc)
 */
export class GlobalWithAuditService<T extends EntityWithAudit<any>> extends GlobalService<T> implements GlobalServiceInterface<T> {

	constructor(
		protected apolloState: ApolloStateService,
		protected fields: GlobalQueries,
		protected sing: string,
		protected plural: string,
		protected userSrv: UserService
	) {
		super(apolloState, fields, sing, plural);
	}

	/** @inheritDoc
	 * Updates on entity with an audit will add properties needed by the backend
	 */
	update(entity: any, client?: Client, isOptimistic: boolean = true) {
		entity.lastUpdatedBy = { id: this.userSrv.userSync.id, __typename: 'User' };
		entity.lastUpdatedDate = '' + new Date();
		return super.update(entity, client, isOptimistic);
	}

	/** @inheritDoc
	 * create on entity with an audit will add properties needed by the backend
	 */
	create(entity: any, client?: Client) {
		const userId = { id: this.userSrv.userSync.id, __typename: 'User' };
		const user = { ...this.userSrv.userSync };
		entity.createdBy = userId;
		entity.creationDate = '' + new Date();
		entity.lastUpdatedBy = userId;
		entity.lastUpdatedDate = '' + new Date();
		return super.create(entity, client);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	delete(id: string, client?: Client) {
		return this.update({ id, deleted: true }, client);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	deleteMany(ids: string[], client?: Client) {
		return forkJoin(ids.map(id => this.delete(id, client)));
	}
}
