import { Injectable } from '@angular/core';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { ProductQueries } from '~entity-services/product/product.queries';
import { UserService } from '~entity-services/user/user.service';
import { Product } from '~models';
import { Angulartics2 } from 'angulartics2';

@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalWithAuditService<Product> {

	constructor(protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected mixpanel?: Angulartics2Mixpanel,
		protected anuglaritcs?: Angulartics2) {
		super(apolloState, ProductQueries, 'product', 'products', userSrv);
	}

	create(entity: any, client?: Client) {
		this.anuglaritcs.eventTrack.next({
			action: 'creation',
			properties: {
				id: entity.id,
				name: entity.name,
				entity: 'product',
				date: new Date()
			}
		});
		// this.mixpanel.eventTrack('creation', {
		// 	id: entity.id,
		// 	name: entity.name,
		// 	entity: 'product',
		// 	date: new Date()
		// });
		return super.create(entity, client);
	}

}
