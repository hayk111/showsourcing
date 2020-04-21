import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EditableModule } from '~shared/editable';
import { InputsModule } from '~shared/inputs';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { PricePipe } from '~shared/price/price.pipe';
import { UtilsModule } from '~shared/utils';
import { PriceComponent, PriceWithQuantityComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		EditableModule,
		InputsCustomModule,
		UtilsModule,
		InputsModule,
		TranslateModule,
	],
	declarations: [
		PriceComponent,
		PricePipe,
		PriceWithQuantityComponent,
	],
	exports: [
		PriceComponent,
		PricePipe,
		PriceWithQuantityComponent,
	],
})
export class PriceModule { }
