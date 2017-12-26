import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components/modal-carousel/modal-carousel.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MatIconModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule
	],
	declarations: [ ModalCarouselComponent, CarouselComponent ],
	exports: [ ModalCarouselComponent, CarouselComponent ]
})
export class CarouselModule { }
