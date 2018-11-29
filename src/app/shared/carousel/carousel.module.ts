import { NgModule } from '@angular/core';
import { CarouselCardComponent } from '~shared/carousel/container/carousel-card/carousel-card.component';
import { FileModule } from '~shared/file/file.module';
import { RatingModule } from '~shared/rating';
import { SharedModule } from '~shared/shared.module';
import { LoadersModule } from '~shared/loaders/loaders.module';

import { CarouselComponent, ModalCarouselComponent } from '~shared/carousel/components';
import { ImagePreviewerComponent } from '~shared/carousel/components/image-previewer/image-previewer.component';
import { ImageModule } from '~shared/image/image.module';
import { CommonModule } from '@angular/common';
import { IconsModule } from '~shared/icons';
import { CardModule } from '~shared/card';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		CardModule,
		FileModule,
		RatingModule,
		ImageModule,
		LoadersModule
	],
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
