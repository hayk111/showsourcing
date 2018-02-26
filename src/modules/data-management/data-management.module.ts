import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditableFieldModule } from '~shared/editable-field/editable-field.module';
import { InputsModule } from '~shared/inputs/inputs.module';

import { DataMananagementTableComponent } from './components';
import { DataManagementPageComponent } from './containers';

@NgModule({
	imports: [CommonModule, InputsModule, EditableFieldModule],
	declarations: [DataManagementPageComponent, DataMananagementTableComponent],
	exports: [DataManagementPageComponent],
})
export class DataManagementModule {}
