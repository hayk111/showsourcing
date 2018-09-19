import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { GroupedFeedListComponent } from '~shared/activity/components/grouped-feed-list/grouped-feed-list.component';
import {
	MultipleProductsActivityCardComponent,
} from '~shared/activity/components/grouped-feed-list/multiple-products-activity-card/multiple-products-activity-card.component';
import {
	OneProductActivityCardComponent,
} from '~shared/activity/components/grouped-feed-list/one-product-activity-card/one-product-activity-card.component';
import { CarouselModule } from '~shared/carousel';
import { CommentModule } from '~shared/comment';
import { LoadersModule } from '~shared/loaders';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';
import { StatusModule } from '~shared/status/status.module';

import { ActivityUserComponent } from './components/activity-user/activity-user.component';
import { FlatFeedListComponent } from './components/flat-feed-list/flat-feed-list.component';
import {
	MultipleProductCarouselComponent,
} from './components/grouped-feed-list/multiple-products-activity-card/multiple-product-carousel/multiple-product-carousel.component';
import { FlatFeedCardComponent } from './components/flat-feed-card/flat-feed-card.component';
import {
	OneActivityCarouselComponent
} from '~shared/activity/components/grouped-feed-list/one-activity-carousel/one-activity-carousel.component';
import {
	OneSupplierActivityCardComponent
} from '~shared/activity/components/grouped-feed-list/one-supplier-activity-card/one-supplier-activity-card.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RatingModule,
		ActionBarModule,
		LoadersModule,
		StatusModule,
		CarouselModule,
		ProductCommonModule,
		CommentModule
	],
	declarations: [
		OneProductActivityCardComponent,
		OneSupplierActivityCardComponent,
		MultipleProductsActivityCardComponent,
		ActivityUserComponent,
		GroupedFeedListComponent,
		OneActivityCarouselComponent,
		MultipleProductCarouselComponent,
		FlatFeedListComponent,
		FlatFeedCardComponent
	],
	exports: [
		OneProductActivityCardComponent,
		OneSupplierActivityCardComponent,
		MultipleProductsActivityCardComponent,
		GroupedFeedListComponent,
		ActivityUserComponent,
		FlatFeedListComponent,
		FlatFeedCardComponent
	]
})
export class ActivityModule { }
