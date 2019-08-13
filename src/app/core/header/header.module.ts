import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

import {
	HeaderComponent,
	HeaderSearchComponent,
	NotifComponent,
	UserPanelComponent,
	SidebarComponent
} from './components';

@NgModule({
	imports: [
		SharedModule,
		SearchBarModule,
		RouterModule.forChild([]),
		UserPictureModule,
		SearchAutocompleteModule
	],
	declarations: [
		HeaderComponent,
		NotifComponent,
		UserPanelComponent,
		HeaderSearchComponent,
		SidebarComponent
	],
	exports: [HeaderComponent, SidebarComponent],
})
export class HeaderModule { }
