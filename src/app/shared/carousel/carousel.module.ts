import { NgModule } from '@angular/core';
import { CarouselCardComponent } from '~shared/carousel/container/carousel-card/carousel-card.component';
import { FileModule } from '~shared/file';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';

import { CarouselComponent, ModalCarouselComponent } from './components';
import { ImagePreviewerComponent } from './components/image-previewer/image-previewer.component';
import { ImageModule } from '~shared/image/image.module';

@NgModule({
	imports: [SharedModule, FileModule, RatingModule, ImageModule],
	declarations: [
		ModalCarouselComponent,
		CarouselComponent,
		ImagePreviewerComponent,
		CarouselCardComponent,
	],
	exports: [
		ModalCarouselComponent,
		CarouselComponent,
		CarouselCardComponent,
		ImagePreviewerComponent
	],
})
export class CarouselModule { }
