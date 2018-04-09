import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components';
import { CarouselComponent } from './components';
import { UtilsModule } from '~shared/utils';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { ImagePreviewerComponent } from './components/image-previewer/image-previewer.component';
import { CarouselCardComponent } from '~app/shared/carousel/container/carousel-card/carousel-card.component';
import { FileModule } from '~app/shared/file';
import { SharedModule } from '~app/shared/shared.module';

@NgModule({
	imports: [SharedModule, FileModule],
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
