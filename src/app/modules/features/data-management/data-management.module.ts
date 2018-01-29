import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataManagementPageComponent } from './components/data-management-page/data-management-page.component';
import { DataMananagementTableComponent } from './components/data-mananagement-table/data-mananagement-table.component';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { EditableFieldModule } from '../../shared/editable-field/editable-field.module';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		EditableFieldModule
	],
	declarations: [ DataManagementPageComponent, DataMananagementTableComponent ],
	exports: [ DataManagementPageComponent ]
})
export class DataManagementModule { }
