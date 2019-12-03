import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from '~shared/badge';
import { CardModule } from '~shared/card';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DividerModule } from '~shared/divider/divider.module';
import { EditableFieldModule } from '~shared/editable-field';
import { FiltersModule } from '~shared/filters/filters.module';
import { IconsModule } from '~shared/icons';
import { ListModule } from '~shared/list/list.module';
import { LoadersModule } from '~shared/loaders';
import { RatingModule } from '~shared/rating';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { BreadCrumbComponent } from '~shared/header/components/bread-crumb/bread-crumb.component';
import { ControllerListComponent } from '~shared/header/components/controller-list/components/controller-list/controller-list.component';
import { HeaderListComponent } from '~shared/header/components/list/header-list.component';
import { ViewSwitcherComponent } from '~shared/header/components/controller-list/components/view-switcher/view-switcher.component';
import { UserPictureModule } from '~shared/user-picture/user-picture.module';
import { UtilsModule } from '~shared/utils';
import { TranslateModule } from '@ngx-translate/core';
import { InputsModule } from '~shared/inputs';
import { ControllerListLeftItemComponent } from './components/controller-list/components/controller-list-left-item/controller-list-left-item.component';
import { ControllerListRightItemComponent } from './components/controller-list/components/controller-list-right-item/controller-list-right-item.component';
import { HeaderListActionButtonsComponent } from './components/list/components/list-action-buttons/header-list-action-buttons.component';
import { HeaderDetailsComponent } from './components/details/header-details.component';
import { HeaderDetailsTitleComponent } from './components/details/components/title/header-details-title.component';
import { HeaderDetailsInfoComponent } from './components/details/components/info/header-details-info.component';
import { HeaderDetailsActionsComponent } from './components/details/components/actions/header-details-actions.component';
import { HeaderNavItemComponent } from './components/details/components/nav-item/header-nav-item.component';
import { HeaderNavComponent } from './components/details/components/nav/header-nav.component';
import { LogoModule } from '~shared/logo/logo.module';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		ReactiveFormsModule,
		RouterModule.forChild([]),
		BadgeModule,
		CardModule,
		ContextMenuModule,
		DividerModule,
		EditableFieldModule,
		FiltersModule,
		FormsModule,
		IconsModule,
		ListModule,
		LoadersModule,
		RatingModule,
		SearchAutocompleteModule,
		SearchBarModule,
		SelectorsModule,
		UserPictureModule,
		UtilsModule,
		TranslateModule,
		LogoModule
	],
	declarations: [
		HeaderListComponent,
		ControllerListComponent,
		ViewSwitcherComponent,
		BreadCrumbComponent,
		HeaderDetailsComponent,
		HeaderDetailsTitleComponent,
		ControllerListLeftItemComponent,
		ControllerListRightItemComponent,
		HeaderListActionButtonsComponent,
		HeaderDetailsInfoComponent,
		HeaderDetailsActionsComponent,
		HeaderNavComponent,
		HeaderNavItemComponent,
	],
	exports: [
		HeaderListComponent,
		ControllerListComponent,
		BreadCrumbComponent,
		HeaderDetailsComponent,
		HeaderDetailsTitleComponent,
		ControllerListLeftItemComponent,
		ControllerListRightItemComponent,
		HeaderListActionButtonsComponent,
		HeaderDetailsInfoComponent,
		HeaderDetailsActionsComponent,
		HeaderNavComponent,
		HeaderNavItemComponent,
	],
})
export class HeaderListModule { }
