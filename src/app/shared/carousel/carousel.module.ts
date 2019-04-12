import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '~shared/card';
import {
	CarouselComponent,
	ImagePreviewer2Component,
	ImageReviewerComponent,
	ModalCarouselComponent,
} from '~shared/carousel/components';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { FileModule } from '~shared/file/file.module';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { RatingModule } from '~shared/rating';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { InputsModule } from '~shared/inputs';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		CardModule,
		FileModule,
		RatingModule,
		ImageModule,
		LoadersModule,
		ContextMenuModule,
		SelectorsModule,
		OverlayModule,
		InputsModule
	],
	declarations: [
		CarouselComponent,
		ImagePreviewer2Component,
		ImageReviewerComponent,
		ModalCarouselComponent,
	],
	exports: [
		CarouselComponent,
		ImagePreviewer2Component,
		ImageReviewerComponent,
		ModalCarouselComponent,
	],
})
export class CarouselModule { }
