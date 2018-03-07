import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components';
import { CarouselComponent } from './components';
import { UtilsModule } from '~shared/utils';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { ImagePreviewerComponent } from './components/image-previewer/image-previewer.component';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
		LoadersModule,
	],
	declarations: [ ModalCarouselComponent, CarouselComponent, ImagePreviewerComponent ],
	exports: [ ModalCarouselComponent, CarouselComponent ]
})
export class CarouselModule { }
