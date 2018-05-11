import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { Apollo, ApolloModule } from 'apollo-angular';
import { apolloReducer, NgrxCache, NgrxCacheModule } from 'apollo-angular-cache-ngrx';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


const GRAPHQL_ENDPOINT_WS = 'ws://vps540915.ovh.net:9080/graphql/%2Fteam%2F2a0ac87c-e1a8-4912-9c0d-2748a4aa9e46';
const GRAPHQL_ENDPOINT_HTTP = 'graphql';

@NgModule({
	imports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule,
		StoreModule.forFeature('apollo', apolloReducer),
		NgrxCacheModule.forRoot('apollo'),
	],
	exports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule
	],
	declarations: []
})
export class AppApolloModule {
	constructor(private apollo: Apollo, private httpLink: HttpLink, private ngrxCache: NgrxCache) {
		this.init();
	}

	async init() {
		const cache = this.ngrxCache.create({});
		// Create an http link:
		const http = this.httpLink.create({
			uri: GRAPHQL_ENDPOINT_HTTP
		});

		// Create a WebSocket link:
		const ws = new WebSocketLink({
			uri: GRAPHQL_ENDPOINT_WS,
			options: {
				reconnect: true
			}
		});

		// using the ability to split links, you can send data to each link
		// depending on what kind of operation is being sent
		const link = split(
			// split based on operation type
			({ query }) => {
				const { kind, operation } = getMainDefinition(query) as any;
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			ws,
			http,
		);

		this.apollo.create({
			link,
			connectToDevTools: true,
			cache
		});
	}
}
