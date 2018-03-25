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
	],
	declarations: [EditableFieldComponent],
	exports: [EditableFieldComponent],
})
export class EditableFieldModule { }
