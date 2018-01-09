import { Directive, ElementRef } from '@angular/core';
import { DragulaDirective } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

@Directive({
	selector: '[kanban]'
})
export class KanbanDirective extends DragulaDirective {

	constructor(el: ElementRef, dragulaService: DragulaService) {
		super(el, dragulaService);
	}

}
