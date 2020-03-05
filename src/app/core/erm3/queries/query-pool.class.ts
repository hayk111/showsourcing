import { DocumentNode } from 'graphql';
import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { CompanyQueries } from './custom/company.queries';
import { TeamQueries } from './custom/team.queries';
import { QueryType } from './query-type.enum';

export class QueryPool {
	static map = {
		/** FOR Cedric development */
		// [EntityName.TAG]: new BaseQueries('tag'), // not provided by the api
		// [EntityName.CATEGORY]: new BaseQueries('category'),
		// [EntityName.PRODUCT]: new ProductQueries(),
		// [EntityName.SUPPLIER]: new SupplierQueries(),
		// [EntityName.COMPANY]: new CompanyQueries(),
		// [EntityName.TEAM]: new TeamQueries(),
		// [EntityName.USER]: new UserQueries(), // not provided by the api

		/** not implemented in the api */
		// [EntityName.ATTACHMENT]: new BaseQueries(EntityName.ATTACHMENT),
		// [EntityName.ACTIVITY]: new BaseQueries(EntityName.ACTIVITY),
		// [EntityName.COMMENT]: new BaseQueries(EntityName.COMMENT),
		// [EntityName.COUNTRY]: new BaseQueries(EntityName.COUNTRY),
		// [EntityName.CURRENCY]: new BaseQueries(EntityName.CURRENCY),
		// [EntityName.EVENT]: new BaseQueries(EntityName.EVENT),
		// [EntityName.EXPORT]: new BaseQueries(EntityName.EXPORT),
		// [EntityName.HARBOUR]: new BaseQueries(EntityName.HARBOUR),
		// [EntityName.LOCATION]: new BaseQueries(EntityName.LOCATION),
		// [EntityName.PROJECT]: new BaseQueries(EntityName.PROJECT),
		// [EntityName.REQUEST]: new BaseQueries(EntityName.REQUEST),
		// [EntityName.REQUEST_ELEMENT]: new BaseQueries(EntityName.REQUEST_ELEMENT), // ? space in typename
		// [EntityName.SAMPLE]: new BaseQueries(EntityName.SAMPLE),
		// [EntityName.TAG]: new BaseQueries(EntityName.TAG),
		// [EntityName.INVITATION]: new BaseQueries(EntityName.INVITATION),
		// [EntityName.TEAM_USER]: new BaseQueries(EntityName.TEAM_USER),

		Category: new BaseQueries('Category'), // provided by the api
		Company: new CompanyQueries('Company'), // provided by the api
		Contact: new BaseQueries('Contact'), // provided by the api
		Descriptor: new BaseQueries('Descriptor', 'target'), // provided by the api
		Image: new BaseQueries('Image', `fileName`), // provided by the api
		Product: new BaseQueries('Product'), // provided by the api
		Supplier: new BaseQueries('Supplier'), // provided by the api
		Task: new BaseQueries('Task'), // provided by the api
		User: new BaseQueries('User', `firstName`),
		Team: new TeamQueries('Team'), // provided by the api
		TeamUser: new BaseQueries('TeamUser'), // provided by the api
	};

	/** returns the query, queryName and body of a specified query*/
<<<<<<< HEAD
	static getQueryInfo(typename: Typename, queryType: QueryType) {
		const queries = QueryPool.map[typename];
=======
	static getQueryInfo(entityName: EntityName, queryType: QueryType | string) {
		const queries = QueryPool.map[entityName];
>>>>>>> queryBy in progress
		if (!queries) {
			throw Error(`The query pool doesn't contain such a member ${queryType}`);
		}
		const query = queries[queryType];
		const queryName = this.getQueryName(query);
		const body = this.getQueryBody(query);
		return { query, queryName, body };
	}

	/** gets the query name from a gql statement */
	static getQueryName(gql: DocumentNode): string {
		try {
			return (gql.definitions[0] as any).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}
	}

	/** gets the content of a graphql query */
	static getQueryBody(gql: DocumentNode): string {
		return gql.loc.source.body;
	}
}
