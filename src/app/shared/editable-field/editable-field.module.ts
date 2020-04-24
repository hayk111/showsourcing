import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from '~shared/badge/badge.module';
import { IconsModule } from '~shared/icons/icons.module';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils/utils.module';

import { EditableContainerComponent, EditableFieldComponent} from './components';

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
		ImageModule,
		TranslateModule
	],
	declarations: [
		EditableContainerComponent,
		EditableFieldComponent
	],
	exports: [
		EditableContainerComponent,
		EditableFieldComponent
	],
})
export class EditableFieldModule { }
