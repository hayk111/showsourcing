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

@NgModule({
	imports: [
		SharedModule,
		SearchBarModule,
		RouterModule.forChild([]),
		UserPictureModule,
		SearchAutocompleteModule,
	],
	declarations: [
		UserPanelComponent,
		HeaderSearchComponent,
		SidebarComponent,
		SidebarItemComponent
	],
	exports: [SidebarComponent, HeaderSearchComponent],
})
export class HeaderModule { }
