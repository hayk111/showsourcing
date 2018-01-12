import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { FiltersModule } from '../filters/filters.module';
import { FilteredListPageComponent } from './components/filtered-list-page/filtered-list-page.component';
import { MatIconModule, MatTableModule, MatProgressBarModule } from '@angular/material';
import { LoadersModule } from '../loaders/loaders.module';

@NgModule({
	imports: [
		CommonModule,
		FiltersModule,
		MatIconModule,
		LoadersModule,
		MatTableModule
	],
	declarations: [ ViewSwitcherComponent, FilteredListPageComponent ],
	exports: [ FilteredListPageComponent ]
})
export class FilteredListPageModule { }
