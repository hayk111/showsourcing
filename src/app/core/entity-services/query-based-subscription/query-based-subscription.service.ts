import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { QueryBasedSubscriptionQueries } from '~entity-services/query-based-subscription/query-based-subscription.queries';
import { QueryBasedSubscription } from '~models';
import { log } from '~utils';

import { GlobalService } from '../_global/global.service';


@Injectable({
	providedIn: 'root'
})
export class QueryBasedSubscriptionService extends GlobalService<QueryBasedSubscription> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, QueryBasedSubscriptionQueries, 'queryBasedSubscription', 'queryBasedSubscriptions');
	}

	queryAll(clientName: Client = this.defaultClient): Observable<any[]> {
		const title = 'Query All ' + this.typeName;
		const gqlStr = gql(`
		query {
			queryBasedSubscriptions {
				name
			}
		}`);
		const queryName = super.getQueryName(gqlStr);

		return of(this.apolloState.getClient(clientName)).pipe(
			tap(_ => this.log(title, gqlStr, queryName, clientName)),
			switchMap(client => client.watchQuery({ query: gqlStr }).valueChanges),
			// extracting the result
			map((r) => {
				if (!r.data)
					throwError(r.errors);
				return r.data[queryName];
			}),
			catchError(errors => of(log.table(errors))),
			tap(data => this.logResult(title, queryName, data)),
			shareReplay(1)
		);
	}

}
