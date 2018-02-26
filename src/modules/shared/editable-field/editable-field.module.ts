import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';
import { InputsModule } from '../inputs/inputs.module';
import { SelectModule } from '../select/select.module';
import { UtilsModule } from '../utils/utils.module';
import { AppStoreModule } from '../../store/store.module';
import { CustomInputsModule } from '../custom-inputs/custom-inputs.module';
import { IconsModule } from '../icons/icons.module';

// text where when it is clicked an input appears
@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		SelectModule,
		CustomInputsModule,
		IconsModule,
		UtilsModule,
		AppStoreModule.forChild()
	],
	declarations: [ EditableFieldComponent ],
	exports: [ EditableFieldComponent ]
})
export class EditableFieldModule { }
