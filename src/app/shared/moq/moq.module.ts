import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MoqComponent } from './components/moq/moq.component';

@NgModule({
	imports: [CommonModule],
	declarations: [MoqComponent],
	exports: [MoqComponent],
})
export class MoqModule {}
