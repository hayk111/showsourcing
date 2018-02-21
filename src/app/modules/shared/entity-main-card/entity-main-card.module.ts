import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityMainCardComponent } from './components/entity-main-card/entity-main-card.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '../card/card.module';

@NgModule({
  imports: [
		CommonModule,
		RouterModule.forChild([]),
		CardModule
  ],
	declarations: [ EntityMainCardComponent ],
	exports: [ EntityMainCardComponent ]
})
export class EntityMainCardModule { }
