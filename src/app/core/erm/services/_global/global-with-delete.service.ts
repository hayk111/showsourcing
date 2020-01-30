import { forkJoin } from 'rxjs';
import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';
import { GlobalService, GlobalServiceInterface } from '~core/erm/services/_global/global.service';

/**
 * Same as global service but adds deleted flag
 */
export class GlobalWithDeleteService<T> extends GlobalService<T> implements GlobalServiceInterface<T> {

	constructor(
		protected fields: GlobalQueries,
		protected sing: string,
		protected plural: string
	) {
		super(fields, sing, plural);
	}

	/** @inheritDoc
	 * Deletes on entity with an audit actually updates items with
	 * a deleted flag set to true
	 */
	delete(id: string) {
		return this.update({ id, deleted: true } as any);
	}

	/** @inheritDoc
	 * Deletes on entity with delete actually updates items with
	 * a deleted flag set to true
	 */
	deleteMany(ids: string[]) {
		return forkJoin(ids.map(id => this.delete(id)));
	}

	// openSubscription(clientName?: Client) {
	// 	return super.openSubscription(clientName, 'deleted == false');
	// }
}
