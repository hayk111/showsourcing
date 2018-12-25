import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { routes } from './routes';
import { SampleCardTestComponent } from './sample-card-test/sample-card-test.component';
import { SampleCommonModule } from '~common/sample';
import { KanbanLibraryPageComponent } from './kanban-library-page/kanban-library-page.component';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProductCardLibraryPageComponent } from './product-card-library-page/product-card-library-page.component';
import { SelectorLibraryComponent } from './selector-library/selector-library.component';


@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		SampleCommonModule,
		ProductCommonModule
	],
	declarations: [
		ComponentLibraryComponent,
		PreviewPageComponent,
		GuidelinesComponent,
		SampleCardTestComponent,
		SelectorLibraryComponent,
		KanbanLibraryPageComponent,
		ProductCardLibraryPageComponent
	],
	exports: [ComponentLibraryComponent],
	providers: []
})
export class ComponentLibraryModule { }
