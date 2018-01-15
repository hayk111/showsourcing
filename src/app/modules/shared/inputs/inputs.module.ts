import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../../store/store.module';
import { InputComponent } from './components/vanilla/input/input.component';
import { InputRadioComponent } from './components/vanilla/input-radio/input-radio.component';
import { InputCheckboxComponent } from './components/vanilla/input-checkbox/input-checkbox.component';
import { InputTextareaComponent } from './components/vanilla/input-textarea/input-textarea.component';
import { SelectModule } from '../select/select.module';

export const components = [
											// vanilla inputs
											InputComponent,
											InputTextareaComponent,
											InputRadioComponent,
											InputCheckboxComponent,
											];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UtilsModule,
		AppStoreModule.forChild(),
		UtilsModule,
	],
	declarations: components,
	// entryComponents: components,
	exports: components,
})
export class InputsModule { }
