import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { SwitchModule } from '../switch/switch.module';
import { FilterSearchBarModule } from '../filter-search-bar/filter-search-bar.module';

@NgModule({
  imports: [
		CommonModule,
		SwitchModule,
		FilterSearchBarModule,

  ],
  declarations: [
		TopPanelComponent
	], exports: [
		TopPanelComponent
	]
})
export class TopPanelModule { }
