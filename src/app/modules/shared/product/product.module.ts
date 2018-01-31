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
import { LikesChartComponent } from './components/likes-chart/likes-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductTopCardComponent } from './components/product-top-card/product-top-card.component';

@NgModule({
	imports: [
		CommonModule,
		CarouselModule,
		IconsModule,
		UtilsModule,
		AppStoreModule.forChild(),
		UserModule.forChild(),
		CardsModule,
		NgxChartsModule,
	],
	declarations: [ ProductSmallCardComponent, ProductBigCardComponent, PriceComponent,
		ProductIconsComponent, LikesChartComponent, ProductTopCardComponent ],
	exports: [ ProductSmallCardComponent, ProductBigCardComponent, LikesChartComponent, ProductTopCardComponent ]
})
export class ProductModule { }
