import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardFooterComponent } from './components/card-footer/card-footer.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [CardComponent, CardHeaderComponent, CardFooterComponent],
	exports: [CardComponent, CardHeaderComponent, CardFooterComponent]
})
export class CardModule { }
