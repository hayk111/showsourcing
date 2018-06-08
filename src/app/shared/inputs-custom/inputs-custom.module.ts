import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPriceCurrencyComponent } from './components/input-price-currency/input-price-currency.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectorsModule } from '~shared/selectors/selectors.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SelectorsModule
	],
	declarations: [InputPriceCurrencyComponent]
})
export class InputsCustomModule { }
