import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { NotifModule } from '~shared/notif';
import { UserPictureModule } from '~shared/user-picture';

import { HeaderComponent, HeaderSearchComponent, UserPanelComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		SearchBarModule,
		RouterModule.forChild([]),
		UserPictureModule,
		SearchAutocompleteModule,
		NotifModule
	],
	declarations: [
		HeaderComponent,
		UserPanelComponent,
		HeaderSearchComponent
	],
	exports: [HeaderComponent],
})
export class HeaderModule { }
