import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge/badge.module';
import { EditableTextComponent } from '~shared/editable-field/components/editable-text/editable-text.component';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UserPictureModule } from '~shared/user-picture';

import { IconsModule } from '~shared/icons/icons.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { UtilsModule } from '~shared/utils/utils.module';
import { EditableLabelComponent } from '~shared/editable-field/components/editable-label/editable-label.component';
import { ImageModule } from '~shared/image/image.module';

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
		ImageModule
	],
	declarations: [EditableTextComponent, EditableLabelComponent],
	exports: [EditableTextComponent, EditableLabelComponent],
})
export class EditableFieldModule { }
