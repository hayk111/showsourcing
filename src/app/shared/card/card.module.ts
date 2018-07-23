import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '~shared/card/components/card/card.component';
import { CardHeaderComponent } from '~shared/card/components/card-header/card-header.component';
import { CardFooterComponent } from '~shared/card/components/card-footer/card-footer.component';
import { DividerModule } from '~shared/divider/divider.module';

@NgModule({
	imports: [
		CommonModule,
		DividerModule
	],
	declarations: [CardComponent, CardHeaderComponent, CardFooterComponent],
	exports: [CardComponent, CardHeaderComponent, CardFooterComponent]
})
export class CardModule { }
