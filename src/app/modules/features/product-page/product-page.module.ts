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

@NgModule({
	imports: [
		CommonModule,
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
	], exports: [ ProductPageComponent ]
})
export class ProductPageModule { }
