import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { ProjectsListViewComponent } from './components/projects-list-view/projects-list-view.component';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	declarations: [
		ProjectsListViewComponent
	],
	exports: [
		ProjectsListViewComponent
	],
	entryComponents: [],
	providers: []
})
export class ProjectCommonModule { }
