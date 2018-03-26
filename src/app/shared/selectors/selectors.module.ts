import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './components/selector/selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgSelectModule
	],
	declarations: [SelectorComponent],
	exports: [SelectorComponent]
})
export class SelectorsModule { }
