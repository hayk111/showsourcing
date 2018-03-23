import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconsModule } from '~app/shared/icons';
import { InputCheckboxComponent } from '~app/shared/inputs/components/input-checkbox/input-checkbox.component';
import { EntityModule } from '~entity/entity.module';

import { UtilsModule } from '../utils/utils.module';
import { InputCheckboxListComponent } from './components/input-checkbox-list/input-checkbox-list.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { InputComponent } from './components/input/input.component';

export const components = [
	InputComponent,
	InputTextareaComponent,
	InputRadioComponent,
	InputCheckboxComponent,
	InputCheckboxListComponent,
	InputFileComponent,
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UtilsModule,
		EntityModule.forChild(),
		NgSelectModule,
		IconsModule,
	],
	declarations: components,
	// entryComponents: components,
	exports: components,
})
export class InputsModule {}
