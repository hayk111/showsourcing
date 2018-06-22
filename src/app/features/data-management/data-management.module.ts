import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditableFieldModule } from '~shared/editable-field/editable-field.module';
import { InputsModule } from '~shared/inputs/inputs.module';

import { DataMananagementTableComponent } from './components';
import { DataManagementPageComponent } from './containers';
import { routes } from './routes';
import { SharedModule } from '~shared/shared.module';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { TableModule } from '~shared/table';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { CategoryService } from '~features/data-management/services/category.service';
import { SelectionService } from '~shared/list-page/selection.service';

@NgModule({
	imports: [
		SharedModule,
		TopPanelModule,
		TableModule,
		RouterModule.forChild([]),
		SideMenuModule
	],
	declarations: [DataManagementPageComponent, DataMananagementTableComponent],
	exports: [DataManagementPageComponent],
	providers: [
		DataManagementService,
		CategoryService,
		SelectionService
	]
})
export class DataManagementModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DataManagementModule,
		};
	}
}
