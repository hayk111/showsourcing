import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '~shared/card';

import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { routes } from './routes';
import { PreviewModule } from '~shared/preview';
import { CarouselModule } from '~shared/carousel';


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CardModule,
		PreviewModule,
		CarouselModule
	],
	declarations: [
		ComponentLibraryComponent,
		PreviewPageComponent,
		GuidelinesComponent
	],
	exports: [ComponentLibraryComponent],
	providers: []
})
export class ComponentLibraryModule { }
