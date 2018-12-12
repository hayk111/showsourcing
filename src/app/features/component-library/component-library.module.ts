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
import { SelectorTestComponent } from './selector-test/selector-test.component';
import { KanbanLibraryPageComponent } from './kanban-library-page/kanban-library-page.component';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProductCardLibraryPageComponent } from './product-card-library-page/product-card-library-page.component';


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
		SelectorTestComponent,
		KanbanLibraryPageComponent,
		ProductCardLibraryPageComponent
	],
	exports: [ComponentLibraryComponent],
	providers: []
})
export class ComponentLibraryModule { }
