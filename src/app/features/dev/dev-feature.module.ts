import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
		Pages.AccordionPageComponent,
		Pages.BadgePageComponent,
		Pages.ButtonPageComponent,
		Pages.CardPageComponent,
		Pages.ColorsPageComponent,
		Pages.CommonListPageComponent,
		Pages.ComponentLibraryComponent,
		Pages.ControllerTablePageComponent,
		Pages.DescriptorPageComponent,
		Pages.DialogPageComponent,
		Pages.EditableContainerPageComponent,
		Pages.FormFieldPageComponent,
		Pages.GuidelinesComponent,
		Pages.IconPageComponent,
		Pages.InputPageComponent,
		Pages.InputsPageComponent,
		Pages.KanbanPageComponent,
		Pages.ListComponent,
		Pages.LoaderPageComponent,
		Pages.PipesPageComponent,
		Pages.PlaygroundPageComponent,
		Pages.PreviewPageComponent,
		Pages.ProductCardPageComponent,
		Pages.RatingPageComponent,
		Pages.SelectorPageComponent,
		Pages.SpacingPageComponent,
		Pages.TablePageComponent,
		Pages.TypographyPageComponent,
		Pages.PackagingPageComponent,
		Pages.PricePageComponent,
		Pages.CustomInputsPageComponent,
		Pages.UploadPageComponent,
		Pages.CarouselPageComponent
	],
	exports: [],
	providers: []
})
export class DevFeatureModule { }
