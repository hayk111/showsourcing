import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

import {
	HeaderComponent,
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
		HeaderComponent,
		UserPanelComponent,
		HeaderSearchComponent,
		SidebarComponent,
		SidebarItemComponent
	],
	exports: [HeaderComponent, SidebarComponent, HeaderSearchComponent],
})
export class HeaderModule { }
