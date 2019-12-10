import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge';
import { ERMModule } from '~shared/erm/erm.module';
import { EditableFieldModule } from '~shared/editable-field';
import { FileModule } from '~shared/file';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { TranslateModule } from '@ngx-translate/core';

import {
	DynamicEditableTextComponent,
	DynamicFormComponent,
	DynamicInputComponent,
	EditablePackagingComponent,
	EditablePriceComponent,
	EditablePriceMatrixComponent,
	EditablePriceMatrixRowComponent,
	EditableSelectorComponent,
	ExtendedFormComponent,
	ExtendedFormEditableTextComponent,
	ExtendedFormInputComponent,
	InputPackagingComponent,
} from './components';
import { InputSelectorComponent } from './components/dynamic-input/inputs/input-selector/input-selector.component';


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
		UserPictureModule,
		ERMModule,
		TranslateModule
	],
	declarations: [
		ExtendedFormComponent,
		ExtendedFormInputComponent,
		DynamicEditableTextComponent,
		DynamicFormComponent,
		DynamicInputComponent,
		EditablePackagingComponent,
		EditablePriceComponent,
		EditablePriceMatrixComponent,
		EditablePriceMatrixRowComponent,
		EditableSelectorComponent,
		InputPackagingComponent,
		InputSelectorComponent,
		ExtendedFormEditableTextComponent,
	],
	exports: [
		DynamicFormComponent,
		EditablePackagingComponent,
		ExtendedFormComponent,
		DynamicEditableTextComponent
	]
})
export class DynamicFormsModule {


}
