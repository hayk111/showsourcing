import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	declarations: [
		ProjectsTableComponent
	],
	exports: [
		ProjectsTableComponent
	],
	entryComponents: [],
	providers: []
})
export class ProjectCommonModule { }
