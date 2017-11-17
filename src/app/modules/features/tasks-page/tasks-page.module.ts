import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { FiltersModule } from '../../shared/filters/filters.module';
import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { TasksLoaderService } from './services/tasks-loader.service';


@NgModule({
  imports: [
		CommonModule,
		FilteredListPageModule,
		FiltersModule
	],
	providers: [ TasksLoaderService ],
  declarations: [TasksPageComponent, TasksListViewComponent]
})
export class TasksPageModule { }
