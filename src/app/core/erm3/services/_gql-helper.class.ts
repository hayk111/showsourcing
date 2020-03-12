import { WatchQueryOptions, MutationOptions } from 'apollo-client';
import { DocumentNode } from 'graphql';

export class GqlHelper {
	/** returns the query, queryName and body of a specified query*/
	static getQueryInfo(options: WatchQueryOptions | MutationOptions) {
		const isMutation = !!(options as any).mutation;
		const query = (options as WatchQueryOptions).query ||
		(options as MutationOptions).mutation;
		const variables = options.variables;
		const queryName = this.getQueryName(query);
		const body = this.getQueryBody(query);
		return { query, queryName, variables, body, isMutation };
	}

	/** gets the query name from a gql statement */
	static getQueryName(gql: DocumentNode): string {
		return (gql.definitions[0] as any).selectionSet.selections[0].name.value;
	}

	/** gets the content of a graphql query */
	static getQueryBody(gql: DocumentNode): string {
		return gql.loc.source.body;
	}
}
