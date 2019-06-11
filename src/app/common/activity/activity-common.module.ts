import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	OneActivityCarouselComponent,
} from '~common/activity/components/grouped-feed-list/one-activity-carousel/one-activity-carousel.component';
import {
	OneSupplierActivityCardComponent,
} from '~common/activity/components/grouped-feed-list/one-supplier-activity-card/one-supplier-activity-card.component';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { ActivityUserComponent } from './components/activity-user/activity-user.component';
import { GroupedFeedListComponent } from './components/grouped-feed-list/grouped-feed-list.component';
import {
	MultipleProductCarouselComponent,
} from './components/grouped-feed-list/multiple-products-activity-card/multiple-product-carousel/multiple-product-carousel.component';
import {
	MultipleProductsActivityCardComponent,
} from './components/grouped-feed-list/multiple-products-activity-card/multiple-products-activity-card.component';
import {
	OneProductActivityCardComponent,
} from './components/grouped-feed-list/one-product-activity-card/one-product-activity-card.component';

import { ActivityCardComponent } from '~common/activity/components/activity-card/activity-card.component';
import { ActivityListComponent } from '~common/activity/components/activity-list/activity-list.component';
import { UtilsModule } from '~shared/utils/utils.module';
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		UtilsModule,
		CommentCommonModule,
	],
	declarations: [
		OneProductActivityCardComponent,
		OneSupplierActivityCardComponent,
		MultipleProductsActivityCardComponent,
		ActivityUserComponent,
		GroupedFeedListComponent,
		OneActivityCarouselComponent,
		MultipleProductCarouselComponent,
		ActivityCardComponent,
		ActivityListComponent,
	],
	exports: [
		OneProductActivityCardComponent,
		OneSupplierActivityCardComponent,
		MultipleProductsActivityCardComponent,
		GroupedFeedListComponent,
		ActivityUserComponent,
		ActivityListComponent,
	]
})
export class ActivityCommonModule { }
