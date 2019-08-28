import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { DataMananagementTableComponent } from './components';
import {
	CategoryDataManagementPageComponent,
	DataManagementPageComponent,
	EventDataManagementPageComponent,
	TagDataManagementPageComponent,
} from './containers';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		TranslateModule
	],
	declarations: [
		DataManagementPageComponent,
		DataMananagementTableComponent,
		CategoryDataManagementPageComponent,
		EventDataManagementPageComponent,
		TagDataManagementPageComponent
	],
	exports: [DataManagementPageComponent],
	providers: []
})
export class DataManagementModule {

}
