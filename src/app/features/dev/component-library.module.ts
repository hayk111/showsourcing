import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SampleCommonModule } from '~common/sample';
import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';
import { SharedModule } from '~shared/shared.module';

import { BadgePageComponent } from './pages/component-library/badge/badge-page.component';
import { CardPageComponent } from './pages/component-library/card/card-page.component';
import { ComponentLibraryComponent } from './pages/component-library/component-library-page.component';
import { GuidelinesComponent } from './pages/component-library/guidelines/guidelines-page.component';
import { IconsPageComponent } from './pages/component-library/icons/icons-page.component';
import { KanbanPageComponent } from './pages/component-library/kanban/kanban-page.component';
import { LoadersPageComponent } from './pages/component-library/loaders/loaders-page.component';
import { PipesPageComponent } from './pages/component-library/pipes/pipes-page.component';
import { PreviewPageComponent } from './pages/component-library/preview/preview-page.component';
import { ProductCardPageComponent } from './pages/component-library/product-card/product-card-page.component';
import { RatingPageComponent } from './pages/component-library/rating/rating-page.component';
import { routes } from './routes';
import { SelectorPageComponent } from './pages/component-library/selector/selector-page.component';
import { TablePageComponent } from './pages/component-library/table/table-page.component';
import { CommonListsPageComponent } from './pages/component-library/common-lists/common-lists-page.component';
import { SupplierCommonModule } from '~common/supplier';
import { ButtonPageComponent } from './pages/component-library/button/button-page.component';
import { AccordionPageComponent } from './pages/component-library/accordion/accordion-page.component';



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
		SelectorPageComponent,
		KanbanPageComponent,
		ProductCardPageComponent,
		LoadersPageComponent,
		IconsPageComponent,
		CardPageComponent,
		BadgePageComponent,
		PipesPageComponent,
		TablePageComponent,
		RatingPageComponent,
		CommonListsPageComponent,
		ButtonPageComponent,
		AccordionPageComponent
	],
	exports: [ComponentLibraryComponent],
	providers: []
})
export class ComponentLibraryModule { }
