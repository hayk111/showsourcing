import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '~shared/tooltip/tooltip.directive';


// from https://github.com/drozhzhin-n-e/ng2-tooltip-directive
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [TooltipDirective],
	exports: [TooltipDirective],
})
export class TooltipModule { }
