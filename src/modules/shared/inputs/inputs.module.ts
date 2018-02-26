import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../../store/store.module';
import { InputComponent } from './components/input/input.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { SelectModule } from '../select/select.module';
import { InputFileComponent } from './components/input-file/input-file.component';

export const components = [
											// vanilla inputs
											InputComponent,
											InputTextareaComponent,
											InputRadioComponent,
											InputCheckboxComponent,
											InputFileComponent
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
