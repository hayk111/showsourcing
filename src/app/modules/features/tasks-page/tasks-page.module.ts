import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { MatTableModule } from '@angular/material';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { DynamicFormsModule } from '../../shared/dynamic-forms/dynamic-forms.module';
import { TopPanelModule } from '../../shared/top-panel/top-panel.module';


@NgModule({
	imports: [
		CommonModule,
		TopPanelModule

	],
	declarations: [
		TasksPageComponent,
		TasksListViewComponent,
	]
})
export class TasksPageModule { }

