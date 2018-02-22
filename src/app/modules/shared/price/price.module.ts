import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceComponent } from './components/price/price.component';
import { CarouselModule } from '../carousel/carousel.module';
import { IconsModule } from '../icons/icons.module';
import { UtilsModule } from '../utils/utils.module';
import { AppStoreModule } from '../../store/store.module';
import { UserModule } from '../../user/user.module';
import { EditableFieldModule } from '../editable-field/editable-field.module';
import { CardModule } from '../card/card.module';
import { FileModule } from '../file/file.module';
import { LoadersModule } from '../loaders/loaders.module';
import { SuppliersModule } from '../../suppliers/suppliers.module';
import { RatingModule } from '../rating/rating.module';
import { SelectableImageModule } from '../selectable-image/selectable-image.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
	imports: [CommonModule],
	declarations: [PriceComponent],
	exports: [PriceComponent]
})
export class PriceModule {}
