import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './components/event-page/event-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { FiltersModule } from '../../shared/filters/filters.module';
import { EventsListViewComponent } from './components/events-list-view/events-list-view.component';
import { MatTableModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FilteredListPageModule,
		FiltersModule,
		MatTableModule
	],
	declarations: [ EventPageComponent, EventsListViewComponent ]
})
export class EventsPageModule { }
