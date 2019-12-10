import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge';
import { EditableFieldModule } from '~shared/editable-field';
import { ERMModule } from '~shared/erm/erm.module';
import { FileModule } from '~shared/file';
import { IconsModule } from '~shared/icons';
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
		TranslateModule,
		IconsModule
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
