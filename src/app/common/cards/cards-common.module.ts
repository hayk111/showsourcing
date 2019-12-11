import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogCommonModule } from '~common/catalogs/catalog-common.module';
import { SharedModule } from '~shared/shared.module';
import { PicturesCardComponent } from './pictures-card/pictures-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardActivitiesComponent } from './product-grid-card/product-card-activities/product-card-activities.component';
import { ProductGridCardComponent } from './product-grid-card/product-grid-card.component';
import { ProjectListCardComponent } from './project-list-card/project-list-card.component';
import { SampleCardComponent } from './sample-card/sample-card.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';



@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		CatalogCommonModule
	],
	declarations: [
		ProductCardComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		SampleCardComponent,
		SupplierCardComponent,
		ProjectListCardComponent,
		PicturesCardComponent,
	],
	exports: [
		ProductCardComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		SampleCardComponent,
		SupplierCardComponent,
		ProjectListCardComponent,
		PicturesCardComponent,
	],
	entryComponents: []
})
export class CardsCommonModule { }
