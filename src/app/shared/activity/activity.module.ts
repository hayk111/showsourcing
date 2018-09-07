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
import { ProductCommonModule } from '~shared/product/product.module';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';
import { StatusModule } from '~shared/status/status.module';

import { ActivityUserComponent } from './components/activity-user/activity-user.component';
import { FlatFeedListComponent } from './components/flat-feed-list/flat-feed-list.component';
import {
	MultipleProductCarouselComponent,
} from './components/grouped-feed-list/multiple-products-activity-card/multiple-product-carousel/multiple-product-carousel.component';
import {
	OneProductCarouselComponent,
} from './components/grouped-feed-list/one-product-activity-card/one-product-carousel/one-product-carousel.component';
import { FlatFeedCardComponent } from './components/flat-feed-card/flat-feed-card.component';

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
		MultipleProductsActivityCardComponent,
		ActivityUserComponent,
		GroupedFeedListComponent,
		OneProductCarouselComponent,
		MultipleProductCarouselComponent,
		FlatFeedListComponent,
		FlatFeedCardComponent
	],
	exports: [
		OneProductActivityCardComponent,
		MultipleProductsActivityCardComponent,
		GroupedFeedListComponent,
		ActivityUserComponent,
		FlatFeedListComponent,
		FlatFeedCardComponent
	]
})
export class ActivityModule { }
