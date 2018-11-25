import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '~shared/card/components/card/card.component';
import { CardHeaderComponent } from '~shared/card/components/card-header/card-header.component';
import { CardFooterComponent } from '~shared/card/components/card-footer/card-footer.component';
import { DividerModule } from '~shared/divider/divider.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { BadgeModule } from '~shared/badge/badge.module';
import { StatusModule } from '~shared/status/status.module';
import { IconsModule } from '~shared/icons/icons.module';
import { KanbanModule } from '~shared/kanban/kanban.module';

@NgModule({
	imports: [
		CommonModule,
		DividerModule,
		InputsModule,
		BadgeModule,
		StatusModule,
		KanbanModule,
		IconsModule
	],
	declarations: [CardComponent, CardHeaderComponent, CardFooterComponent],
	exports: [CardComponent, CardHeaderComponent, CardFooterComponent]
})
export class CardModule { }
