import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataMananagementTableComponent } from '~features/data-management/components';
import { DataManagementPageComponent } from '~features/data-management/containers';
import {
	CategoryDataManagementPageComponent,
} from '~features/data-management/containers/category-data-management-page/category-data-management-page.component';
import {
	EventDataManagementPageComponent,
} from '~features/data-management/containers/event-data-management-page/event-data-management-page.component';
import {
	TagDataManagementPageComponent,
} from '~features/data-management/containers/tag-data-management-page/tag-data-management-page.component';
import { SharedModule } from '~shared/shared.module';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
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
