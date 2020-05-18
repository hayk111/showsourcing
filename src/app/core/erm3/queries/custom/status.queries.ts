import { BaseQueries } from '../base.queries';
import { Typename } from '~core/erm3/typename.type';
import gql from 'graphql-tag';

export class StatusQueries extends BaseQueries {
	static defaultFields = `
		id
		name
		inWorkflow
		step
		final
		type
		category
		_version
	`;

	// the updateStatus is used with these Typenames. We use this to generate queries;
	private _customTypenames: Typename[] = ['Task', 'Product', 'Supplier', 'Sample'];
	private _customUpdateQueries = {};

	constructor() {
		super('WorkflowStatus', StatusQueries.defaultFields);
		this._customTypenames.forEach(typename => {
			this._customUpdateQueries[typename] = this._updateStatusQueryFn(typename);
		});
	}

	/** get query for update the status of an entity (product | supplier | sample | task)
	 * the variables for the query are : entityId, statusId
	 * @param typename: name of the entity we want to change status
	 */
	getUpdateStatusQuery(typename: Typename) {
		if (!this._customTypenames.includes(typename))
			throw Error(`the typename "${typename}" is not available on custom query updateStatus`);
		return this._customUpdateQueries[typename];
	}

	/** build the queries for the right typenames. Method used only when we instanciate the class */
	private _updateStatusQueryFn(typename: Typename) {
		return gql`
		mutation Update${typename}Status(
			$entityId: ID!
			$statusId: ID!
		) {
			update${typename}Status(${typename.toLowerCase()}Id: $entityId, statusId: $statusId) {
				id
				name
				status {
					${this.defaultFields}
				}
			}
  	}`;
	}
}
