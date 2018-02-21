import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityMainCardComponent } from './components/entity-main-card/entity-main-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
		CommonModule,
		RouterModule.forChild([])
  ],
	declarations: [ EntityMainCardComponent ],
	exports: [ EntityMainCardComponent ]
})
export class EntityMainCardModule { }
