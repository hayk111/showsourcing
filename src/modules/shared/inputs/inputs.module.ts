import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStoreModule } from '~store/store.module';

import { UtilsModule } from '../utils/utils.module';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { InputComponent } from './components/input/input.component';

export const components = [
	// vanilla inputs
	InputComponent,
	InputTextareaComponent,
	InputRadioComponent,
	InputCheckboxComponent,
	InputFileComponent,
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
export class InputsModule {}
