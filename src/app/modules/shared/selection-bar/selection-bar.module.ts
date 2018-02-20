import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionBarComponent } from './components/selection-bar/selection-bar.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  imports: [
		CommonModule,
		IconsModule
  ],
	declarations: [ SelectionBarComponent ],
	exports: [ SelectionBarComponent ]
})
export class SelectionBarModule { }
