import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '~shared/card';
import { CarouselComponent, ModalCarouselComponent, ImagePreviewer2Component } from '~shared/carousel/components';
import { ImagePreviewerComponent } from '~shared/carousel/components/image-previewer/image-previewer.component';
import { CarouselCardComponent } from '~shared/carousel/container/carousel-card/carousel-card.component';
import { FileModule } from '~shared/file/file.module';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { RatingModule } from '~shared/rating';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		CardModule,
		FileModule,
		RatingModule,
		ImageModule,
		LoadersModule,
		ContextMenuModule
	],
	declarations: [
		ModalCarouselComponent,
		CarouselComponent,
		ImagePreviewerComponent,
		ImagePreviewer2Component,
		CarouselCardComponent,
	],
	exports: [
		ModalCarouselComponent,
		CarouselComponent,
		CarouselCardComponent,
		ImagePreviewerComponent,
		ImagePreviewer2Component,
	],
})
export class CarouselModule { }
