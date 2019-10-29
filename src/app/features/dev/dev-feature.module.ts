import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { CreationDialogsCommonModule } from '~common/dialogs/creation-dialogs/creation-dialogs-common.module';
import { CustomDialogsCommonModule } from '~common/dialogs/custom-dialogs/custom-dialogs-common.module';
import { SelectionDialogsCommonModule } from '~common/dialogs/selection-dialogs/selection-dialogs-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import * as Pages from './pages';
import { routes } from './routes';



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule,
		CreationDialogsCommonModule,
		SelectionDialogsCommonModule,
		CustomDialogsCommonModule,
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
