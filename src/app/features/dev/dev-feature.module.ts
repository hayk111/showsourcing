import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '~shared/shared.module';

import * as Pages from './pages';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { CommonModalsModule } from '~common/modals/common-modals.module';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { routes } from './routes';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule,
		CommonModalsModule,
		BoardsCommonModule,
		CardsCommonModule
	],
	declarations: [
		Pages.ComponentLibraryComponent,
		Pages.PreviewPageComponent,
		Pages.GuidelinesComponent,
		Pages.SelectorPageComponent,
		Pages.KanbanPageComponent,
		Pages.ProductCardPageComponent,
		Pages.LoaderPageComponent,
		Pages.IconPageComponent,
		Pages.CardPageComponent,
		Pages.BadgePageComponent,
		Pages.PipesPageComponent,
		Pages.TablePageComponent,
		Pages.RatingPageComponent,
		Pages.CommonListPageComponent,
		Pages.ButtonPageComponent,
		Pages.AccordionPageComponent,
		Pages.PlaygroundPageComponent
	],
	exports: [],
	providers: []
})
export class DevFeatureModule { }
