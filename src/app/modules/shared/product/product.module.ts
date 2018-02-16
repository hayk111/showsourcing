import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSmallCardComponent } from './components/product-small-card/product-small-card.component';
import { ProductBigCardComponent } from './components/product-big-card/product-big-card.component';
import { PriceComponent } from './components/price/price.component';
import { CarouselModule } from '../carousel/carousel.module';
import { IconsModule } from '../icons/icons.module';
import { UtilsModule } from '../utils/utils.module';
import { AppStoreModule } from '../../store/store.module';
import { ProductIconsComponent } from './components/product-icons/product-icons.component';
import { UserModule } from '../user/user.module';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ProductTopCardComponent } from './components/product-top-card/product-top-card.component';
import { ProductInfoCardComponent } from './components/product-info-card/product-info-card.component';
import { EditableFieldModule } from '../editable-field/editable-field.module';
import { ProductSubInfoComponent } from './components/product-sub-info/product-sub-info.component';
import { CardModule } from '../card/card.module';
import { FileModule } from '../file/file.module';
import { LoadersModule } from '../loaders/loaders.module';
import { ProductStatusBadgeComponent } from './components/product-status-badge/product-status-badge.component';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { ProductSelectableCardComponent } from './components/product-selectable-card/product-selectable-card.component';
import { FeedbackModule } from '../feedback/feedback.module';

@NgModule({
	imports: [
		CommonModule,
		CarouselModule,
		IconsModule,
		UtilsModule,
		AppStoreModule.forChild(),
		UserModule.forChild(),
		EditableFieldModule,
		IconsModule,
		FileModule,
		CardModule,
		TooltipModule,
		LoadersModule,
		SuppliersModule,
		FeedbackModule
	],
	declarations: [
		ProductSmallCardComponent,
		ProductBigCardComponent,
		PriceComponent,
		ProductIconsComponent,
		ProductTopCardComponent,
		ProductInfoCardComponent,
		ProductSubInfoComponent,
		ProductStatusBadgeComponent,
		ProductSelectableCardComponent,
	],
	exports: [
		ProductSmallCardComponent,
		ProductBigCardComponent,
		ProductTopCardComponent,
		ProductInfoCardComponent,
		ProductSelectableCardComponent
	]
})
export class ProductModule { }
