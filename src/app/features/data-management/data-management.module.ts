import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService, SupplierService, EventService, ProductService } from '~shared/global-services';
import { SharedModule } from '~shared/shared.module';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { TableModule } from '~shared/table';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { SelectionService } from '~shared/list-page/selection.service';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

import { DataMananagementTableComponent } from './components';
import { DataManagementPageComponent } from './containers';

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
		SelectionService,
		SupplierService,
		EventService,
		ProductService
	]
})
export class DataManagementModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DataManagementModule,
		};
	}
}
