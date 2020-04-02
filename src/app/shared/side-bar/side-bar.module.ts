import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

import {
	HeaderSearchComponent,
	UserPanelComponent,
	SidebarComponent,
	SidebarItemComponent
} from './components';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadersModule } from '~shared/loaders';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '~shared/inputs';
import { NotifModule } from '~shared/notif/notif.module';
import { IconsModule } from '~shared/icons';
import { BadgeModule } from '~shared/badge';

@NgModule({
	imports: [
		CommonModule,
		SearchBarModule,
		RouterModule.forChild([]),
		UserPictureModule,
		SearchAutocompleteModule,
		ContextMenuModule,
		SearchAutocompleteModule,
		TranslateModule,
		LoadersModule,
		ReactiveFormsModule,
		InputsModule,
		NotifModule,
		IconsModule,
		BadgeModule
	],
	declarations: [
		UserPanelComponent,
		HeaderSearchComponent,
		SidebarComponent,
		SidebarItemComponent
	],
	exports: [SidebarComponent, HeaderSearchComponent],
})
export class SideBarModule { }
