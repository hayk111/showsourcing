import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomInputsModule } from '../custom-inputs/custom-inputs.module';
import { IconsModule } from '../icons/icons.module';
import { InputsModule } from '../inputs/inputs.module';
import { SelectModule } from '../select/select.module';
import { UtilsModule } from '../utils/utils.module';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';
import { EntityModule } from '~app/shared/entity';

// text where when it is clicked an input appears
@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		SelectModule,
		CustomInputsModule,
		IconsModule,
		UtilsModule,
		EntityModule.forChild(),
	],
	declarations: [EditableFieldComponent],
	exports: [EditableFieldComponent],
})
export class EditableFieldModule {}
