import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';


@NgModule({
	imports: [
		ApolloModule,
		HttpLinkModule
	],
	exports: [
		ApolloModule,
		HttpLinkModule,
	],
	providers: [],
})
export class AppApolloModule {
}
