import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	SearchBarAnimatedComponent,
} from './components/search-bar-animated/search-bar-animated.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [SearchBarAnimatedComponent, SearchBarComponent],
	exports: [SearchBarAnimatedComponent, SearchBarComponent]
})
export class SearchBarModule { }
