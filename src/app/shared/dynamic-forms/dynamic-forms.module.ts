import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge';
import { EditableFieldModule } from '~shared/editable-field';
import { FileModule } from '~shared/file';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';

import {
	DynamicEditableTextComponent,
	DynamicFormComponent,
	DynamicInputComponent,
	EditablePackagingComponent,
	EditablePriceComponent,
	EditablePriceMatrixComponent,
	EditablePriceMatrixRowComponent,
	EditableSelectorComponent,
	InputPackagingComponent,
} from './components';
import { CustomFormInputComponent } from './components/extended-form/custom-form-input/custom-form-input.component';
import { CustomFormComponent } from './components/extended-form/custom-form.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		InputsModule,
		InputsCustomModule,
		EditableFieldModule,
		SelectorsModule,
		BadgeModule, // for displaying multiple values
		UtilsModule,
		FileModule,
		ImageModule,
		UserPictureModule
	],
	declarations: [
		DynamicEditableTextComponent,
		DynamicFormComponent,
		DynamicInputComponent,
		EditablePackagingComponent,
		EditablePriceComponent,
		EditablePriceMatrixComponent,
		EditablePriceMatrixRowComponent,
		EditableSelectorComponent,
		CustomFormComponent,
		CustomFormInputComponent,
		InputPackagingComponent,
	],
	exports: [
		DynamicFormComponent,
		CustomFormComponent
	]
})
export class DynamicFormsModule {


}
