import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { DataMananagementTableComponent } from './components';
import {
	CategoryDataManagementPageComponent,
	SupplierDataManagementPageComponent,
	DataManagementPageComponent,
	EventDataManagementPageComponent,
	TagDataManagementPageComponent,
} from './containers';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([])
	],
	declarations: [
		DataManagementPageComponent,
		DataMananagementTableComponent,
		CategoryDataManagementPageComponent,
		SupplierDataManagementPageComponent,
		EventDataManagementPageComponent,
		TagDataManagementPageComponent
	],
	exports: [DataManagementPageComponent],
	providers: []
})
export class DataManagementModule {

}
