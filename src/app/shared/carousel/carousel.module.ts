import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCarouselComponent } from './components';
import { CarouselComponent } from './components';
import { UtilsModule } from '~shared/utils';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		IconsModule,
		LoadersModule,
	],
	declarations: [ ModalCarouselComponent, CarouselComponent ],
	exports: [ ModalCarouselComponent, CarouselComponent ]
})
export class CarouselModule { }
