import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { FilteredListPageComponent } from './components/filtered-list-page/filtered-list-page.component';
import { MatTableModule, MatProgressBarModule } from '@angular/material';
import { LoadersModule } from '../loaders/loaders.module';
import { Filters2Module } from '../filters2/filters2.module';

@NgModule({
	imports: [
		CommonModule,
		Filters2Module,
		LoadersModule,
		MatTableModule
	],
	declarations: [ ViewSwitcherComponent, FilteredListPageComponent ],
	exports: [ FilteredListPageComponent ]
})
export class FilteredListPageModule { }
