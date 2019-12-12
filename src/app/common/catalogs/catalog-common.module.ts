import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '~shared/shared.module';
import { TaskCatalogComponent } from './task-catalog/task-catalog.component';
import { SampleCatalogComponent } from './sample-catalog/sample-catalog.component';
import { ProjectCatalogComponent } from './project-catalog/project-catalog.component';

@NgModule({
	imports: [ CommonModule, SharedModule ],
	exports: [
		ProjectCatalogComponent,
		SampleCatalogComponent,
		TaskCatalogComponent
	],
	declarations: [
		ProjectCatalogComponent,
		SampleCatalogComponent,
		TaskCatalogComponent
	],
})
export class CatalogCommonModule { }
