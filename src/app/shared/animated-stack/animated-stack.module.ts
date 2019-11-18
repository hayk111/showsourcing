import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedStackComponent } from './components/animated-stack/animated-stack.component';
import { AnimatedCardComponent } from './components/animated-card/animated-card.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [AnimatedStackComponent, AnimatedCardComponent],
	exports: [AnimatedStackComponent, AnimatedCardComponent]
})
export class AnimatedStackModule { }
