import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { IconsModule } from '~shared/icons';
import { AccordionTitleComponent } from './accordion-title.component';
import { AccordionContentComponent } from './accordion-content.component';
import { DividerModule } from '~shared/divider/divider.module';

@NgModule({
	declarations: [ AccordionComponent, AccordionTitleComponent, AccordionContentComponent ],
	imports: [
		CommonModule,
		IconsModule,
		DividerModule
	],
	exports: [ AccordionComponent, AccordionTitleComponent, AccordionContentComponent ]
})
export class AccordionModule { }
