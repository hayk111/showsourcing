import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { split, from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { cleanTypenameLink } from './clean.typename.link';


const GRAPHQL_ENDPOINT_WS = 'ws://vps540915.ovh.net:9080/graphql/%2Fteam%2F2a0ac87c-e1a8-4912-9c0d-2748a4aa9e46';
const GRAPHQL_ENDPOINT_HTTP = 'graphql';

@NgModule({
	imports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule
	],
	exports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule
	],
	declarations: []
})
export class AppApolloModule {
	constructor(private apollo: Apollo, private httpLink: HttpLink) {
		this.init();
	}

	async init() {
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
		const transportLink = split(
			// split based on operation type
			({ query }) => {
				const { kind, operation } = getMainDefinition(query) as any;
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			ws,
			http,
		);

		const link = from ([
			cleanTypenameLink,
			transportLink
		]);

		this.apollo.create({
			link,
			connectToDevTools: true,
			cache: new InMemoryCache()
		});
	}
}
