import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { CreationDialogsCommonModule } from '~common/dialogs/creation-dialogs/creation-dialogs-common.module';
import { CustomDialogsCommonModule } from '~common/dialogs/custom-dialogs/custom-dialogs-common.module';
import { SelectionDialogsCommonModule } from '~common/dialogs/selection-dialogs/selection-dialogs-common.module';
import { ListCommonModule } from '~common/list/list-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import * as Pages from './pages';
import { routes } from './routes';
import { DescriptorPageComponent } from './pages/component-library/descriptor-page/descriptor-page.component';




@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule,
		ListCommonModule,
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
		Pages.ListComponent,
		Pages.InputPageComponent,
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
		Pages.PlaygroundPageComponent,
		Pages.EditableContainerPageComponent,
		Pages.ColorsPageComponent,
		Pages.SpacingPageComponent,
		Pages.TypographyPageComponent,
		Pages.ControllerTablePageComponent,
		DescriptorPageComponent
	],
	exports: [],
	providers: []
})
export class DevFeatureModule { }
