import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { BasicInfoBoxComponent } from './components/basic-info-box/basic-info-box.component';
import { FavoriteFlagComponent } from './components/favorite-flag/favorite-flag.component';
import { BasicInfoActionsComponent } from './components/basic-info-actions/basic-info-actions.component';
import { BasicInfoIconsInfoComponent } from './components/basic-info-icons-info/basic-info-icons-info.component';
import { BasicInfoTextInfoComponent } from './components/basic-info-text-info/basic-info-text-info.component';
import { ProductActivityPageComponent } from './components/product-activity-page/product-activity-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([])
	],
	declarations: [
		ProductPageComponent,
		BasicInfoBoxComponent,
		FavoriteFlagComponent,
		BasicInfoActionsComponent,
		BasicInfoIconsInfoComponent,
		BasicInfoTextInfoComponent,
		ProductActivityPageComponent,
	], exports: [ ProductPageComponent ]
})
export class ProductPageModule { }
