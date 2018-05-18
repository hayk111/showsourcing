import { UserModule } from './../../features/user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { IconsModule } from '../icons/icons.module';
import { InputsModule } from '../inputs/inputs.module';
import { UtilsModule } from '../utils/utils.module';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';
import { BadgeModule } from '~app/shared/badge/badge.module';
import { CellOneRowComponent } from '~app/shared/editable-field/components/cell-one-row/cell-one-row.component';
import { CellTwoRowComponent } from '~app/shared/editable-field/components/cell-two-row/cell-two-row.component';
import { UserPictureModule } from '~app/shared/user-picture';
import { EditableTextComponent } from '~app/shared/editable-field/components/editable-text/editable-text.component';
import { SelectorsModule } from '~app/shared/selectors/selectors.module';
import { CustomEditableFieldComponent } from './components/custom-editable-field/custom-editable-field.component';

// text where when it is clicked an input appears
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		InputsModule,
		SelectorsModule,
		BadgeModule, // used to display a badge in the status selector
		UtilsModule, // click outside directive used
		UserPictureModule, // used in editable field type user
	],
	declarations: [EditableFieldComponent, EditableTextComponent, CellOneRowComponent, CellTwoRowComponent, CustomEditableFieldComponent],
	exports: [EditableFieldComponent, EditableTextComponent, CellOneRowComponent, CellTwoRowComponent, CustomEditableFieldComponent],
})
export class EditableFieldModule { }
