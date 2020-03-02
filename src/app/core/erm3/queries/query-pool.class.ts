import { BaseQueries } from './base.queries';
import { EntityName, EntityNameType } from '~core/erm/entity-name.enum';
import { ProductQueries } from './custom/product.queries';
import { SupplierQueries } from './custom/supplier.queries';
import { TeamCedricQueries } from './custom/team-cedric.queries';
import { UserQueries } from './custom/user.queries';
import { CompanyQueries } from './custom/company.queries';
import { QueryType } from './query-type.enum';
import { DocumentNode } from 'graphql';
import { TeamQueries } from './custom/team.queries';

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

		[EntityName.CATEGORY]: new BaseQueries(EntityName.CATEGORY), // provided by the api
		[EntityName.COMPANY]: new BaseQueries(EntityName.COMPANY), // provided by the api
		[EntityName.CONTACT]: new BaseQueries(EntityName.CONTACT), // provided by the api
		[EntityName.DESCRIPTOR]: new BaseQueries(EntityName.DESCRIPTOR, 'target'), // provided by the api
		[EntityName.IMAGE]: new BaseQueries(EntityName.IMAGE, `fileName`), // provided by the api
		[EntityName.PRODUCT]: new BaseQueries(EntityName.PRODUCT), // provided by the api
		[EntityName.SUPPLIER]: new BaseQueries(EntityName.SUPPLIER), // provided by the api
		[EntityName.TASK]: new BaseQueries(EntityName.TASK), // provided by the api
		[EntityName.USER]: new BaseQueries(EntityName.USER, `firstName`),
		[EntityName.TEAM]: new TeamQueries(EntityName.TEAM), // provided by the api // ! there is no list/update/delete TEAM
	};

	/** returns the query, queryName and body of a specified query*/
	static getQueryInfo(entityName: EntityName | EntityNameType, queryType: QueryType) {
		const queries = QueryPool.map[entityName];
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
