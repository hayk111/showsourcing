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

import { EditableContainerComponent, EditableFieldComponent, EditableValueComponent} from './components';
import { EditableActionsComponent } from './components/editable-actions/editable-actions.component';
import { EditableLabelComponent } from './components/editable-label/editable-label.component';
import { EditableField2Component } from './components/editable-field2/editable-field2.component';

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
		EditableFieldComponent,
		EditableField2Component,
		EditableValueComponent,
		EditableActionsComponent,
		EditableLabelComponent
	],
	exports: [
		EditableContainerComponent,
		EditableFieldComponent,
		EditableField2Component,
		EditableValueComponent,
		EditableLabelComponent
	],
})
export class EditableModule { }
