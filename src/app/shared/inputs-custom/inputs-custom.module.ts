import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPriceComponent } from '~shared/inputs-custom/components/input-price/input-price.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectorsModule,
		UtilsModule,
		InputsModule
	],
	declarations: [InputPriceComponent],
	exports: [InputPriceComponent]
})
export class InputsCustomModule { }
