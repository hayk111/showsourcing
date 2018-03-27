import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components';
import { CarouselComponent } from './components';
import { UtilsModule } from '~shared/utils';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { ImagePreviewerComponent } from './components/image-previewer/image-previewer.component';
import { CarouselSelectionComponent } from '~app/shared/carousel/container/carousel-selection/carousel-selection.component';
import { FileModule } from '~app/shared/file';

@NgModule({
	imports: [CommonModule, UtilsModule, IconsModule, LoadersModule, FileModule],
	declarations: [
		ModalCarouselComponent,
		CarouselComponent,
		ImagePreviewerComponent,
		CarouselSelectionComponent,
	],
	exports: [
		ModalCarouselComponent,
		CarouselComponent,
		CarouselSelectionComponent,
	],
})
export class CarouselModule { }
