import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { forkJoin, from, Observable } from 'rxjs';
import { catchError, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { EntityMetadata, ERM } from '~core/models';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { TeamService } from '~entity-services/team/team.service';
import { Team } from '~models/team.model';
import { ApolloStateService } from './apollo-state.service';




@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloClient {

	private uri: string;

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService,
		protected realmServerSrv: RealmServerService,
		protected ermSrv: ERMService

	) {
		super(apollo, link, apolloState, realmServerSrv, Client.TEAM);
	}

	init(realmUser: RealmUser, team: Team): Observable<any> {
		const userId = realmUser.identity;
		// here the user client is ready if a team is selected
		this.uri = `${team.realmPath}/__partial/${userId}/${this.suffix}`;
		this.setPending('setting pending because creating');
		return from(super.createClient(this.uri, realmUser, this.client)).pipe(
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			take(1),
			catchError(e => this.onError(e))
		);
	}

	createMissingSubscription(): Observable<any> {
		const entities = [
			ERM.ATTACHMENT,
			ERM.ATTACHMENT_UPLOAD_REQUEST,
			ERM.CATEGORY,
			ERM.COMMENT,
			ERM.CONTACT,
			ERM.EVENT,
			ERM.EXPORT_REQUEST,
			ERM.EXTENDED_FIELD_DEFINITION,
			ERM.IMAGE_UPLOAD_REQUEST,
			ERM.REQUEST_RPC,
			ERM.INVITATION,
			ERM.PRODUCT,
			ERM.PRODUCT_STATUS,
			ERM.PROJECT,
			ERM.REQUEST_TEMPLATE,
			ERM.SAMPLE,
			ERM.SAMPLE_STATUS,
			// ERM.SELECTOR_ELEMENT, // TODO BackEnd uncomment this line
			ERM.SUPPLIER,
			ERM.SUPPLIER_STATUS,
			ERM.SUPPLIER_TYPE,
			ERM.TAG,
			ERM.TASK,
			ERM.TEAM,
			ERM.TEAM_USER,
			ERM.USER
		];
		const newSubs = entities.map((erm: EntityMetadata) => this.ermSrv.getGlobalService(erm).openSubscription(Client.TEAM));
		return forkJoin(newSubs);
	}

}
