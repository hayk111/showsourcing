import { GlobalService } from "~global-services/_global/global.service";
import { EntityMetadata } from "~models";
import { ApolloWrapper } from "~shared/apollo";
import { GlobalQuery } from "~global-services/_global/global.query.interface";
import { UserService } from "~global-services";
import { RefetchParams } from "~shared/apollo/services/refetch.interface";
import { forkJoin } from "rxjs";

/**
 * Same as global service but adds an audit (created by, last updated date etc)
 */
export class GlobalWithAuditService<T> extends GlobalService<T> {

	constructor(
		protected wrapper: ApolloWrapper,
		protected queries: GlobalQuery,
		protected typename: string,
		protected userSrv: UserService
	) {
		super(wrapper, queries, typename);
	}

	update(entity: any, client?: string) {
		entity.lastUpdatedBy = { id: this.userSrv.userSync.id };
		entity.lastUpdatedDate = '' + new Date();

		return super.update(entity, client);
	}

	create(entity: any, refetchParams?: RefetchParams[], client?: string) {
		entity.createdBy = { id: this.userSrv.userSync.id };
		entity.creationDate = '' + new Date();
		entity.lastUpdatedBy = { id: this.userSrv.userSync.id };
		entity.lastUpdatedDate = '' + new Date();
		return super.create(entity, refetchParams, client);
	}

	// deleteMany(ids: string[], client?: string) {
	// 	return forkJoin(ids.map(id => this.deleteOne(id, client)));
	// }

	// deleteOne(id: string, client?: string) {
	// 	return this.update({ id, deleted: true }, client);
	// }

}