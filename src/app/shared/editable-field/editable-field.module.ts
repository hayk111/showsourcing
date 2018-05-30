import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge/badge.module';
import { EditableTextComponent } from '~shared/editable-field/components/editable-text/editable-text.component';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UserPictureModule } from '~shared/user-picture';

import { IconsModule } from '../icons/icons.module';
import { InputsModule } from '../inputs/inputs.module';
import { UtilsModule } from '../utils/utils.module';

// text where when it is clicked an input appears
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		InputsModule,
		IconsModule,
		SelectorsModule,
		BadgeModule, // used to display a badge in the status selector
		UtilsModule, // click outside directive used
		UserPictureModule, // used in editable field type user
	],
	declarations: [EditableTextComponent],
	exports: [EditableTextComponent],
})
export class EditableFieldModule { }
