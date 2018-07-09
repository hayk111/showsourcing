import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { GqlClient } from '~shared/apollo/services/gql-client.service';
import { ApolloService } from '~shared/apollo/services/apollo.service';

import {
	ApolloIssuePageComponent,
} from './components/apollo-issue-page/apollo-issue-page.component';



@NgModule({
	imports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule
	],
	exports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule,
		ApolloIssuePageComponent
	],
	providers: [GqlClient, ApolloService],
	declarations: [ApolloIssuePageComponent]
})
export class AppApolloModule {
}
