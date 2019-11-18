import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PricePipe } from '~shared/price/price.pipe';
import { PriceWithQuantityComponent } from '~shared/price/components';
import { PriceComponent } from '~shared/price/components/price/price.component';
import { EditableFieldModule } from '~shared/editable-field';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, EditableFieldModule, InputsCustomModule, UtilsModule, InputsModule, TranslateModule],
	declarations: [PriceComponent, PricePipe, PriceWithQuantityComponent],
	exports: [PriceComponent, PricePipe, PriceWithQuantityComponent],
})
export class PriceModule { }
