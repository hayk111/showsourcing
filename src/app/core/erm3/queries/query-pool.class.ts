import { BaseQueries } from './_base.queries';
import { EntityName } from '~core/erm/entity-name.enum';
import { ProductQueries } from './custom/product.queries';
import { SupplierQueries } from './custom/supplier.queries';
import { TeamQueries } from './custom/team.queries';
import { UserQueries } from './custom/user.queries';
import { CompanyQueries } from './custom/company.queries';
import { QueryType } from './query-type.enum';
import { DocumentNode } from 'graphql';

export class QueryPool {
	static map = {
		[EntityName.TAG]: new BaseQueries('tag'),
		[EntityName.CATEGORY]: new BaseQueries('category'),
		[EntityName.PRODUCT]: new ProductQueries(),
		[EntityName.SUPPLIER]: new SupplierQueries(),
		[EntityName.COMPANY]: new CompanyQueries(),
		[EntityName.TEAM]: new TeamQueries(),
		[EntityName.USER]: new UserQueries()
	};

	/** returns the query, queryName and body of a specified query*/
	static getQueryInfo(entityName: EntityName, queryType: QueryType) {
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
