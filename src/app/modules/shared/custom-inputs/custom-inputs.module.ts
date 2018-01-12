import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from '../inputs/inputs.module';
import { SelectModule } from '../select/select.module';
import { InputPriceComponent } from './components/input-price/input-price.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputCurrencyComponent } from './components/input-currency/input-currency.component';

@NgModule({
	imports: [
		CommonModule,
		SelectModule,
		InputsModule,
		ReactiveFormsModule
	],
	declarations: [ InputPriceComponent, InputCurrencyComponent ],
	exports: [ InputPriceComponent, InputCurrencyComponent ]
})
export class CustomInputsModule { }
