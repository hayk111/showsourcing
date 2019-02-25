import { Injectable } from '@angular/core';
import { ProductService, SupplierService, UserService } from '~entity-services';
import { SupplierQueries } from '~entity-services/supplier/supplier.queries';
import { ApolloStateService } from '~core/apollo';
import { AnalyticsService } from '~common/activity/services/analytics.service';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		private supplierSrv: SupplierService,
		protected userSrv: UserService
	) {
		super(analyticsSrv, apolloState, userSrv);
	}
}
