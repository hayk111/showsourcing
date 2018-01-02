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
import { CarouselModule } from '../../shared/carousel/carousel.module';
import { FileModule } from '../../shared/file/file.module';
import { SelectModule } from '../../shared/select/select.module';
import { CommentModule } from '../../shared/comment/comment.module';
import { UtilsModule } from '../../shared/utils/utils.module';
import { AppStoreModule } from '../../store/store.module';
import { FormsModule } from '@angular/forms';
import { ProductSampleComponent } from './components/product-sample/product-sample.component';
import { ProductTechDetailsComponent } from './components/product-tech-details/product-tech-details.component';
import { ProductTasksComponent } from './components/product-tasks/product-tasks.component';
import { ProducShippingComponent } from './components/produc-shipping/produc-shipping.component';
import { ProductFilesComponent } from './components/product-files/product-files.component';
import { ProductShippingComponent } from './components/product-shipping/product-shipping.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([]),
		CarouselModule,
		FileModule,
		SelectModule,
		CommentModule,
		AppStoreModule.forChild()
	],
	declarations: [
		ProductPageComponent,
		BasicInfoBoxComponent,
		FavoriteFlagComponent,
		BasicInfoActionsComponent,
		BasicInfoIconsInfoComponent,
		BasicInfoTextInfoComponent,
		ProductActivityPageComponent,
		ProductSampleComponent,
		ProductTechDetailsComponent,
		ProductTasksComponent,
		ProducShippingComponent,
		ProductFilesComponent,
		ProductShippingComponent,
	], exports: [ ProductPageComponent ]
})
export class ProductPageModule { }
