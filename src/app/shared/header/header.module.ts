import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

import { HeaderComponent, NotifComponent, UserPanelComponent } from '~shared/header/components';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';

@NgModule({
	imports: [
		SharedModule,
		SearchBarModule,
		RouterModule.forChild([]),
		UserPictureModule,
		SearchAutocompleteModule
	],
	declarations: [HeaderComponent, NotifComponent, UserPanelComponent],
	exports: [HeaderComponent],
})
export class HeaderModule { }
