import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { LoadersModule } from '../loaders/loaders.module';
import { CarouselContainerComponent } from './containers/carousel-container/carousel-container.component';
import { CarouselModule } from '../carousel/carousel.module';

@NgModule({
	imports: [
		CommonModule,
		LoadersModule,
		CarouselModule
	],
	declarations: [
	  FileDropDirective,
    FileSelectDirective,
    CarouselContainerComponent
  ],
	exports: [
	  FileDropDirective,
    FileSelectDirective,
    CarouselContainerComponent
  ],
})
export class FileModule { }
