import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardFooterComponent } from '~shared/card/components/card-footer/card-footer.component';
import { CardHeaderComponent } from '~shared/card/components/card-header/card-header.component';
import { CardComponent } from '~shared/card/components/card/card.component';
import { DividerModule } from '~shared/divider/divider.module';

@NgModule({
	imports: [
		CommonModule,
		DividerModule,
	],
	declarations: [CardComponent, CardHeaderComponent, CardFooterComponent],
	exports: [CardComponent, CardHeaderComponent, CardFooterComponent]
})
export class CardModule { }
