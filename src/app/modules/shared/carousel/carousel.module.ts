import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components/modal-carousel/modal-carousel.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MatIconModule } from '@angular/material';
import { UtilsModule } from '../utils/utils.module';
import { CarouselEntityComponent } from './components/carousel-entity/carousel-entity.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		UtilsModule
	],
	declarations: [ ModalCarouselComponent, CarouselComponent, CarouselEntityComponent ],
	exports: [ ModalCarouselComponent, CarouselComponent, CarouselEntityComponent ]
})
export class CarouselModule { }
