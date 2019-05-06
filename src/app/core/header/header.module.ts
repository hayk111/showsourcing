import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

import { HeaderComponent, HeaderSearchComponent, NotifComponent, UserPanelComponent } from './components';

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
		HeaderSearchComponent
	],
	exports: [HeaderComponent],
})
export class HeaderModule { }
