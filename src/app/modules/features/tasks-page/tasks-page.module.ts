import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { FiltersModule } from '../../shared/filters/filters.module';
import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { MatTableModule } from '@angular/material';
import { TasksDialogComponent } from './components/tasks-dialog/tasks-dialog.component';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { DynamicFormsModule } from '../../shared/dynamic-forms/dynamic-forms.module';


@NgModule({
	imports: [
		CommonModule,
		FilteredListPageModule,
		FiltersModule,
		MatTableModule,
		DialogModule,
		DynamicFormsModule
	],
	declarations: [TasksPageComponent, TasksListViewComponent, TasksDialogComponent]
})
export class TasksPageModule { }

