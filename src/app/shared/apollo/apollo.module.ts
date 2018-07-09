import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import {
	ApolloIssuePageComponent,
} from './components/apollo-issue-page/apollo-issue-page.component';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';



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
	providers: [ApolloWrapper],
	declarations: [ApolloIssuePageComponent]
})
export class AppApolloModule {
}
