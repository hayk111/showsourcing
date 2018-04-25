import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardFooterComponent } from './components/card-footer/card-footer.component';
import { DividerModule } from '~app/shared/divider/divider.module';

@NgModule({
	imports: [
		CommonModule,
		DividerModule
	],
	declarations: [CardComponent, CardHeaderComponent, CardFooterComponent],
	exports: [CardComponent, CardHeaderComponent, CardFooterComponent]
})
export class CardModule { }
