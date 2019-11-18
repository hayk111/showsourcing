import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { ProductCardComponent } from './product-card/product-card.component';
import {
	ProductCardActivitiesComponent,
} from './product-grid-card/product-card-activities/product-card-activities.component';
import { ProductGridCardComponent } from './product-grid-card/product-grid-card.component';
import { SampleCardComponent } from './sample-card/sample-card.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';
import { ProjectListCardComponent } from './project-list-card/project-list-card.component';
import { ListCommonModule } from '~common/list/list-common.module';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ListCommonModule
	],
	declarations: [
		ProductCardComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		SampleCardComponent,
		SupplierCardComponent,
		ProjectListCardComponent,
	],
	exports: [
		ProductCardComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		SampleCardComponent,
		SupplierCardComponent,
		ProjectListCardComponent,
	],
	entryComponents: []
})
export class CardsCommonModule { }
