import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputsModule } from '../inputs/inputs.module';
import { SelectModule } from '../select/select.module';
import { InputCurrencyComponent } from './components/input-currency/input-currency.component';
import { InputPriceComponent } from './components/input-price/input-price.component';

@NgModule({
	imports: [CommonModule, SelectModule, InputsModule, ReactiveFormsModule],
	declarations: [InputPriceComponent, InputCurrencyComponent],
	exports: [InputPriceComponent, InputCurrencyComponent],
})
export class CustomInputsModule {}
