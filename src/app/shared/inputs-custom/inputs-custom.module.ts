import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPriceComponent } from '~shared/inputs-custom/components/input-price/input-price.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
import { InputPriceInlineComponent } from './components/input-price-inline/input-price-inline.component';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectorsModule,
		IconsModule,
		UtilsModule,
		InputsModule
	],
	declarations: [InputPriceComponent, InputPriceInlineComponent],
	exports: [InputPriceComponent, InputPriceInlineComponent]
})
export class InputsCustomModule { }
