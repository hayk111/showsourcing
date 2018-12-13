import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BadgeModule } from '~shared/badge';
import {
	DynamicEditableTextComponent,
	DynamicFormComponent,
	EditablePriceMatrixComponent,
	EditablePriceMatrixRowComponent,
	EditablePriceComponent,
	EditablePackagingComponent,
	EditableSelectorComponent,
	InputPackagingComponent,
	DynamicInputComponent,
} from './components';

import { EditableFieldModule } from '~shared/editable-field';
import { FileModule } from '~shared/file';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';



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
		NgSelectModule,
		UserPictureModule
	],
	declarations: [
		DynamicFormComponent,
		DynamicEditableTextComponent,
		EditablePriceMatrixComponent,
		EditablePriceMatrixRowComponent,
		EditablePriceComponent,
		EditablePackagingComponent,
		EditableSelectorComponent,
		InputPackagingComponent,
		DynamicInputComponent
	],
	exports: [DynamicFormComponent]
})
export class DynamicFormsModule {


}
