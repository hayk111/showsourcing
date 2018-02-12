import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components/modal-carousel/modal-carousel.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UtilsModule } from '../utils/utils.module';
import { CarouselEntityComponent } from './components/carousel-entity/carousel-entity.component';
import { IconsModule } from '../icons/icons.module';
import { LoadersModule } from '../loaders/loaders.module';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
		LoadersModule
	],
	declarations: [ ModalCarouselComponent, CarouselComponent, CarouselEntityComponent ],
	exports: [ ModalCarouselComponent, CarouselComponent, CarouselEntityComponent ]
})
export class CarouselModule { }
