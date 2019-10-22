import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SupplierCommonModule } from '~common/supplier';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';
import { SharedModule } from '~shared/shared.module';

import { AccordionLibPageComponent } from './accordion-lib-page/accordion-lib-page.component';
import { BadgeLibPageComponent } from './badge-lib-page/badge-lib-page.component';
import { ButtonLibPageComponent } from './button-lib-page/button-lib-page.component';
import { CardLibPageComponent } from './card-lib-page/card-lib-page.component';
import { CommonListsLibPageComponent } from './common-lists-lib-page/common-lists-lib-page.component';
import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { IconsLibPageComponent } from './icons-lib-page/icons-lib-page.component';
import { KanbanLibraryPageComponent } from './kanban-library-page/kanban-library-page.component';
import { LoadersLibPageComponent } from './loaders-lib-page/loaders-lib-page.component';
import { PipesLibPageComponent } from './pipes-lib-page/pipes-lib-page.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { ProductCardLibraryPageComponent } from './product-card-library-page/product-card-library-page.component';
import { RatingLibraryPageComponent } from './rating-library-page/rating-library-page.component';
import { routes } from './routes';
import { SampleCardTestComponent } from './sample-card-test/sample-card-test.component';
import { SelectorLibraryComponent } from './selector-library/selector-library.component';
import { TableLibPageComponent } from './table-lib-page/table-lib-page.component';
import { WorkflowMngmntTableLibComponent } from './workflow-mngmnt-table-lib/workflow-mngmnt-table-lib.component';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		ProductCommonModule,
		SupplierCommonModule,
		WorkflowMngmtCommonModule,
		PreviewsCommonModule,
		BoardsCommonModule,
		TablesCommonModule,
		CardsCommonModule
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
		RatingLibraryPageComponent,
		CommonListsLibPageComponent,
		ButtonLibPageComponent,
		AccordionLibPageComponent
	],
	exports: [ComponentLibraryComponent],
	providers: []
})
export class ComponentLibraryModule { }
