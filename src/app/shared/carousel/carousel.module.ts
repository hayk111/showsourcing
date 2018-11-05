import { NgModule } from '@angular/core';
import { CarouselCardComponent } from '~shared/carousel/container/carousel-card/carousel-card.component';
import { FileModule } from '~shared/file';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';
import { LoadersModule } from '~shared/loaders/loaders.module';

import { CarouselComponent, ModalCarouselComponent } from '~shared/carousel/components';
import { ImagePreviewerComponent } from '~shared/carousel/components/image-previewer/image-previewer.component';
import { ImageModule } from '~shared/image/image.module';

@NgModule({
	imports: [SharedModule, FileModule, RatingModule, ImageModule, LoadersModule],
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
