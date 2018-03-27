import { UserModule } from './../../features/user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { EntityModule } from '~app/shared/entity';

import { IconsModule } from '../icons/icons.module';
import { InputsModule } from '../inputs/inputs.module';
import { UtilsModule } from '../utils/utils.module';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';
import { SelectorsModule } from '~app/shared/selectors/selectors.module';
import { BadgeModule } from '~app/shared/badge/badge.module';
import { CellOneRowComponent } from '~app/shared/editable-field/components/cell-one-row/cell-one-row.component';
import { CellTwoRowComponent } from '~app/shared/editable-field/components/cell-two-row/cell-two-row.component';

// text where when it is clicked an input appears
@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		InputsModule,
		NgSelectModule,
		UserModule,
		IconsModule,
		UtilsModule,
		EntityModule.forChild(),
		SelectorsModule,
		BadgeModule, // used to display a badge in the status selector
	],
	declarations: [EditableFieldComponent, CellOneRowComponent, CellTwoRowComponent],
	exports: [EditableFieldComponent, CellOneRowComponent, CellTwoRowComponent],
})
export class EditableFieldModule { }
