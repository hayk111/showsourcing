import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components/modal-carousel/modal-carousel.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ ModalCarouselComponent ],
	exports: [ ModalCarouselComponent ]
})
export class CarouselModule { }
