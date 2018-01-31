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
import { CardsModule } from '../cards/cards.module';

@NgModule({
	imports: [
		CommonModule,
		CarouselModule,
		IconsModule,
		UtilsModule,
		AppStoreModule.forChild(),
		UserModule.forChild(),
		CardsModule
	],
	declarations: [ ProductSmallCardComponent, ProductBigCardComponent, PriceComponent, ProductIconsComponent ],
	exports: [ ProductSmallCardComponent, ProductBigCardComponent ]
})
export class ProductModule { }
