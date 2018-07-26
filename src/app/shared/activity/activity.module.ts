import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneProductActivityCardComponent } from './components/one-product-activity-card/one-product-activity-card.component';
import {
	MultipleProductsActivityCardComponent
} from './components/multiple-products-activity-card/multiple-products-activity-card.component';
import { SharedModule } from '~shared/shared.module';
import { RatingModule } from '~shared/rating';
import { ActivityUserComponent } from './components/activity-user/activity-user.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
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
		ActivityListComponent
	]
})
export class ActivityModule { }
