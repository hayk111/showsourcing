import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge/badge.module';
import { IconsModule } from '~shared/icons/icons.module';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils/utils.module';

import { EditableDisplayComponent, EditableContainerComponent, EditableFieldComponent } from './components';

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
	declarations: [
		EditableContainerComponent,
		EditableDisplayComponent,
		EditableFieldComponent
	],
	exports: [
		EditableContainerComponent,
		EditableDisplayComponent,
		EditableFieldComponent
	],
})
export class EditableFieldModule { }
