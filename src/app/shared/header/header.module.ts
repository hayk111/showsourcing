import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, NotifComponent, UserPanelComponent } from '~shared/header/components';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';

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
