import { NgModule } from '@angular/core';
import { SearchBarComponent } from '~shared/search-bar-animated/components/search-bar/search-bar.component';
import { SharedModule } from '~shared/shared.module';

import { SearchBarAnimatedComponent } from '~shared/search-bar-animated/components/search-bar-animated/search-bar-animated.component';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [SearchBarAnimatedComponent, SearchBarComponent],
	exports: [SearchBarAnimatedComponent, SearchBarComponent]
})
export class SearchBarModule { }
