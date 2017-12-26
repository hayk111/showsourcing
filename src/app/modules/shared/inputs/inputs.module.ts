import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { UtilsModule } from '../utils/utils.module';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../../store/store.module';
import { InputComponent } from './components/vanilla/input/input.component';
import { InputCurrencyComponent } from './components/custom/input-currency/input-currency.component';
import { InputPriceComponent } from './components/custom/input-price/input-price.component';
import { InputRadioComponent } from './components/vanilla/input-radio/input-radio.component';
import { InputCheckboxComponent } from './components/vanilla/input-checkbox/input-checkbox.component';
import { InputTextareaComponent } from './components/vanilla/input-textarea/input-textarea.component';

export const components = [
											// vanilla inputs
											InputComponent,
											InputTextareaComponent,
											InputRadioComponent,
											InputCheckboxComponent,
											// used in dynamic forms
											InputCurrencyComponent,
											InputPriceComponent,
											];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UtilsModule,
		AppStoreModule.forChild(),
		UtilsModule,
		MatIconModule,
	],
	declarations: components,
	// entryComponents: components,
	exports: components,
})
export class InputsModule { }
