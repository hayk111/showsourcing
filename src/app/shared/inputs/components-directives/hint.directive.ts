import { Directive, Input } from '@angular/core';

@Directive({
	selector: 'hint-app'
})
export class HintDirective {
	@Input() align: 'left' | 'right' = 'left';
	constructor() { }

}
