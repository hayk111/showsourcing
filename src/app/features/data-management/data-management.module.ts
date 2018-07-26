import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { CreationDialogComponent, EditionDialogComponent, MergeDialogComponent } from '~shared/custom-dialog';
import { SharedModule } from '~shared/shared.module';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

@NgModule({
	imports: [
		SharedModule,
		TopPanelModule,
		TableModule,
		RouterModule.forChild([]),
		SideMenuModule
	],
	declarations: [DataManagementPageComponent, DataMananagementTableComponent, CategoryDataManagementPageComponent,
		EventDataManagementPageComponent,
		TagDataManagementPageComponent],
	entryComponents: [CreationDialogComponent, EditionDialogComponent, MergeDialogComponent],
	exports: [DataManagementPageComponent]
})
export class DataManagementModule {

}
