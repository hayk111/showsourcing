import { forkJoin } from 'rxjs';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';
import { GlobalService, GlobalServiceInterface } from '~entity-services/_global/global.service';

/**
 * Same as global service but adds deleted flag
 */
export class GlobalWithDeleteService<T> extends GlobalService<T> implements GlobalServiceInterface<T> {

	constructor(
		protected apolloState: ApolloStateService,
		protected fields: GlobalQueries,
		protected sing: string,
		protected plural: string
	) {
		super(apolloState, fields, sing, plural);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	delete(id: string, client?: Client) {
		return this.update({ id, deleted: true } as any, client);
	}

	/** @inheritDoc
	 * Deletes on entity with delete actually updates items with
	 * a deleted flag set to true
	 */
	deleteMany(ids: string[], client?: Client) {
		return forkJoin(ids.map(id => this.delete(id, client)));
	}

	// openSubscription(clientName?: Client) {
	// 	return super.openSubscription(clientName, 'deleted == false');
	// }
}
