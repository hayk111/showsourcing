import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';
import { SharedModule } from '~shared/shared.module';

import { BadgePageComponent } from './pages/component-library/badge/badge-page.component';
import { CardPageComponent } from './pages/component-library/card/card-page.component';
import { ComponentLibraryComponent } from './pages/component-library/component-library-page.component';
import { GuidelinesComponent } from './pages/component-library/guidelines/guidelines-page.component';
import { IconPageComponent } from './pages/component-library/icon/icon-page.component';
import { KanbanPageComponent } from './pages/component-library/kanban/kanban-page.component';
import { LoaderPageComponent } from './pages/component-library/loader/loader-page.component';
import { PipesPageComponent } from './pages/component-library/pipes/pipes-page.component';
import { PreviewPageComponent } from './pages/component-library/preview/preview-page.component';
import { ProductCardPageComponent } from './pages/component-library/product-card/product-card-page.component';
import { RatingPageComponent } from './pages/component-library/rating/rating-page.component';
import { routes } from './routes';
import { SelectorPageComponent } from './pages/component-library/selector/selector-page.component';
import { TablePageComponent } from './pages/component-library/table/table-page.component';
import { CommonListPageComponent } from './pages/component-library/common-list/common-list-page.component';
import { ButtonPageComponent } from './pages/component-library/button/button-page.component';
import { AccordionPageComponent } from './pages/component-library/accordion/accordion-page.component';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { PlaygroundPageComponent } from './pages';
import { CommonModalsModule } from '~common/modals/common-modals.module';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		WorkflowMngmtCommonModule,
		TablesCommonModule,
		CommonModalsModule,
		BoardsCommonModule,
		CardsCommonModule
	],
	declarations: [
		ComponentLibraryComponent,
		PreviewPageComponent,
		GuidelinesComponent,
		SelectorPageComponent,
		KanbanPageComponent,
		ProductCardPageComponent,
		LoaderPageComponent,
		IconPageComponent,
		CardPageComponent,
		BadgePageComponent,
		PipesPageComponent,
		TablePageComponent,
		RatingPageComponent,
		CommonListPageComponent,
		ButtonPageComponent,
		AccordionPageComponent,
		PlaygroundPageComponent
	],
	exports: [ComponentLibraryComponent],
	providers: []
})
export class DevFeatureModule { }
