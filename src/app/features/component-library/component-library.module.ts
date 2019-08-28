import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SampleCommonModule } from '~common/sample';
import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';
import { SharedModule } from '~shared/shared.module';
import { BadgeLibPageComponent } from './badge-lib-page/badge-lib-page.component';
import { CardLibPageComponent } from './card-lib-page/card-lib-page.component';
import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { IconsLibPageComponent } from './icons-lib-page/icons-lib-page.component';
import { KanbanLibraryPageComponent } from './kanban-library-page/kanban-library-page.component';
import { LoadersLibPageComponent } from './loaders-lib-page/loaders-lib-page.component';
import { PipesLibPageComponent } from './pipes-lib-page/pipes-lib-page.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { ProductCardLibraryPageComponent } from './product-card-library-page/product-card-library-page.component';
import { routes } from './routes';
import { SampleCardTestComponent } from './sample-card-test/sample-card-test.component';
import { SelectorLibraryComponent } from './selector-library/selector-library.component';
import { TableLibPageComponent } from './table-lib-page/table-lib-page.component';
import { WorkflowMngmntTableLibComponent } from './workflow-mngmnt-table-lib/workflow-mngmnt-table-lib.component';
import { CommonListsLibPageComponent } from './common-lists-lib-page/common-lists-lib-page.component';
import { SupplierCommonModule } from '~common/supplier';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		SampleCommonModule,
		ProductCommonModule,
		SupplierCommonModule,
		WorkflowMngmtCommonModule,
	],
	declarations: [
		ComponentLibraryComponent,
		PreviewPageComponent,
		GuidelinesComponent,
		SampleCardTestComponent,
		SelectorLibraryComponent,
		KanbanLibraryPageComponent,
		ProductCardLibraryPageComponent,
		WorkflowMngmntTableLibComponent,
		LoadersLibPageComponent,
		IconsLibPageComponent,
		CardLibPageComponent,
		BadgeLibPageComponent,
		PipesLibPageComponent,
		TableLibPageComponent,
		CommonListsLibPageComponent
	],
	exports: [ComponentLibraryComponent],
	providers: []
})
export class ComponentLibraryModule { }
