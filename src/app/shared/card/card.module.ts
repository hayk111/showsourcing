import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '~shared/card/components/card/card.component';
import { CardHeaderComponent } from '~shared/card/components/card-header/card-header.component';
import { CardFooterComponent } from '~shared/card/components/card-footer/card-footer.component';
import { DividerModule } from '~shared/divider/divider.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { BadgeModule } from '~shared/badge/badge.module';
import { KanbanItemCardComponent } from '~shared/card/components/kanban-item-card/kanban-item-card.component';

@NgModule({
	imports: [
		CommonModule,
		DividerModule,
		InputsModule,
		BadgeModule
	],
	declarations: [CardComponent, CardHeaderComponent, CardFooterComponent, KanbanItemCardComponent],
	exports: [CardComponent, CardHeaderComponent, CardFooterComponent, KanbanItemCardComponent]
})
export class CardModule { }
