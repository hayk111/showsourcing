import { Component } from '@angular/core';

@Component({
	selector: 'accordion-title-app',
	template: '<ng-content></ng-content>',
	styles: [`
	:host {
		font-size: var(--font-size-xl);
		font-weight: 600;
	}
	`]
})
export class AccordionTitleComponent {}
