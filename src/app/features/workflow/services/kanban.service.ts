import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class KanbanService {
	/** The dragStart subject for the kanban (the drag'n drop started) */
	dragStart$ = new Subject<{ namespace: any, data: any }>();
	/** The dragStart subject for the kanban (the drag'n drop ended) */
	dragEnd$ = new Subject<{ namespace: any, data: any }>();
	/** The itemEntered subject for the kanban (item entered a dropzone) */
	itemEntered$ = new Subject<any>();
	/** The itemLeft subject for the kanban (item left a dropzone) */
	itemLeft$ = new Subject<any>();

	constructor() { }

}
