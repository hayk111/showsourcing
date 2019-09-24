import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '~shared/card';
import {
	CarouselComponent,
	ImagePreviewer2Component,
	ImageReviewerComponent,
	ModalCarouselComponent,
	PreviewHeaderListComponent,
} from '~shared/carousel/components';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { FileModule } from '~shared/file/file.module';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { RatingModule } from '~shared/rating';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';
import { PriceModule } from '~shared/price';
import { DividerModule } from '~shared/divider/divider.module';
import { TranslateModule } from '@ngx-translate/core';

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
		InputsModule,
		UtilsModule,
		PriceModule,
		DividerModule,
		TranslateModule
	],
	declarations: [
		CarouselComponent,
		ImagePreviewer2Component,
		ImageReviewerComponent,
		ModalCarouselComponent,
		PreviewHeaderListComponent,
	],
	exports: [
		CarouselComponent,
		ImagePreviewer2Component,
		ImageReviewerComponent,
		ModalCarouselComponent,
		PreviewHeaderListComponent,
	]
})
export class CarouselModule { }
