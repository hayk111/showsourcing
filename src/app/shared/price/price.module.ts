import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SSPricePipe } from '~shared/price/price.pipe';
import { PriceWithQuantityComponent } from '~shared/price/components';
import { PriceComponent } from '~shared/price/components/price/price.component';
import { EditableFieldModule } from '~shared/editable-field';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
@NgModule({
	imports: [CommonModule,EditableFieldModule, InputsCustomModule, UtilsModule, InputsModule],
	declarations: [PriceComponent, SSPricePipe, PriceWithQuantityComponent],
	exports: [PriceComponent, SSPricePipe, PriceWithQuantityComponent],
})
export class PriceModule {}
