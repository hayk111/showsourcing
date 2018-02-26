import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditableFieldModule } from '~shared/editable-field/editable-field.module';
import { InputsModule } from '~shared/inputs/inputs.module';

import { DataMananagementTableComponent } from './components';
import { DataManagementPageComponent } from './containers';
import { routes } from './routes';

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), InputsModule, EditableFieldModule],
	declarations: [DataManagementPageComponent, DataMananagementTableComponent],
	exports: [DataManagementPageComponent],
})
export class DataManagementModule {}
