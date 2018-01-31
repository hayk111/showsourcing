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
import { ProductFilesComponent } from './components/product-files/product-files.component';
import { ProductShippingComponent } from './components/product-shipping/product-shipping.component';
import { ProductMainCardComponent } from './components/product-main-card/product-main-card.component';
import { EditableFieldModule } from '../../shared/editable-field/editable-field.module';
import { LoadersModule } from '../../shared/loaders/loaders.module';
import { ProductModule } from '../../shared/product/product.module';
import { IconsModule } from '../../shared/icons/icons.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([]),
		CarouselModule,
		FileModule,
		SelectModule,
		CommentModule,
		AppStoreModule.forChild(),
		EditableFieldModule,
		LoadersModule,
		ProductModule,
		UtilsModule,
		IconsModule
	],
	declarations: [
		ProductPageComponent,
		BasicInfoBoxComponent,
		FavoriteFlagComponent,
		BasicInfoActionsComponent,
		BasicInfoIconsInfoComponent,
		BasicInfoTextInfoComponent,
		ProductPageComponent,
		ProductActivityPageComponent,
		ProductSampleComponent,
		ProductTechDetailsComponent,
		ProductTasksComponent,
		ProductFilesComponent,
		ProductShippingComponent,
		ProductMainCardComponent,
	], exports: [
		ProductPageComponent,
		BasicInfoBoxComponent
	]
})
export class ProductPageModule { }
