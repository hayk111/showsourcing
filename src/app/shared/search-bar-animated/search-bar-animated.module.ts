import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarAnimatedComponent } from './components/search-bar-animated/search-bar-animated.component';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [SearchBarAnimatedComponent],
	exports: [SearchBarAnimatedComponent]
})
export class SearchBarAnimatedModule { }
