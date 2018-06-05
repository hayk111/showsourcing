import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { ApolloIssuePageComponent } from './components/apollo-issue-page/apollo-issue-page.component';
import { ApolloClient } from '~shared/apollo/services/apollo-client.service';
import { ApolloService } from '~shared/apollo/services/apollo.service';
=======
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { split, from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { cleanTypenameLink } from './clean.typename.link';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientQueries } from '~shared/apollo/apollo-client-queries';
import { map } from 'rxjs/operators';
import { TokenService } from '~features/auth/services/token.service';
>>>>>>> implementing the schema



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
	providers: [ApolloClient, ApolloService],
	declarations: [ApolloIssuePageComponent]
})
export class AppApolloModule {

}
