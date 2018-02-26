import { ProductService } from './services/product.service';
import { RatingModule } from '~shared/rating';
import { SelectableImageModule } from '~shared/selectable-image';
import { EditableFieldModule } from '~shared/editable-field';
import { SuppliersModule } from '~suppliers';
import { FileModule } from '~shared/file/file.module';
import { UtilsModule } from '~shared/utils/utils.module';
import { UserModule } from '~user/user.module';
import { AppStoreModule } from '~store/store.module';
import { PriceModule } from '~shared/price/price.module';
import { IconsModule } from '~shared/icons/icons.module';
import { CardModule } from '~shared/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './store';
import {
	ProductIconsComponent,
	ProductSelectableCardComponent,
	ProductTopCardComponent,
	ProductSmallCardComponent,
	ProductSubInfoComponent,
	ProductStatusBadgeComponent,
	ProductInfoCardComponent,
	ProductBigCardComponent,
} from '~products';

import { routes } from './routes';
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		// StoreModule.forFeature('testEntities', reducers),
		EffectsModule.forFeature(effects),
		AppStoreModule, // TODO to be removed and placed inside the component module using it
		UserModule, // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		FileModule, // TODO to be removed and placed inside the component module using it
		SuppliersModule, // TODO to be removed and placed inside the component module using it
		EditableFieldModule, // TODO to be removed and placed inside the component module using it
		SelectableImageModule, // TODO to be removed and placed inside the component module using it
		IconsModule, // TODO to be removed and placed inside the component module using it
		CardModule, // TODO to be removed and placed inside the component module using it
		PriceModule, // TODO to be removed and placed inside the component module using it
		RatingModule, // TODO to be removed and placed inside the component module using it
	],
	providers: [ProductService],
	declarations: [
		ProductSmallCardComponent,
		ProductBigCardComponent,
		ProductIconsComponent,
		ProductTopCardComponent,
		ProductInfoCardComponent,
		ProductStatusBadgeComponent,
		ProductSelectableCardComponent,
		ProductSubInfoComponent,
	],
	exports: [
		ProductSmallCardComponent,
		ProductBigCardComponent,
		ProductTopCardComponent,
		ProductInfoCardComponent,
		ProductSelectableCardComponent,
	],
})
export class ProductModule {}
