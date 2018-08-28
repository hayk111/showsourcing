import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneProductActivityCardComponent } from '~shared/activity/components/one-product-activity-card/one-product-activity-card.component';
import {
	MultipleProductsActivityCardComponent
} from '~shared/activity/components/multiple-products-activity-card/multiple-products-activity-card.component';
import { SharedModule } from '~shared/shared.module';
import { RatingModule } from '~shared/rating';
import { ActivityUserComponent } from './components/activity-user/activity-user.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { LoadersModule } from '~shared/loaders';
import { StatusModule } from '~shared/status/status.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RatingModule,
		ActionBarModule,
		LoadersModule,
		StatusModule
	],
	declarations: [
		OneProductActivityCardComponent,
		MultipleProductsActivityCardComponent,
		ActivityUserComponent,
		ActivityListComponent
	],
	exports: [
		OneProductActivityCardComponent,
		MultipleProductsActivityCardComponent,
		ActivityListComponent,
		ActivityUserComponent
	]
})
export class ActivityModule { }
