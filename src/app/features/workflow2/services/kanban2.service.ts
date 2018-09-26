import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class Kanban2Service {
	/** The dragStart subject for the kanban (the drag'n drop started) */
	dragStart$ = new Subject<{ namespace: string, data: any }>();
	/** The dragStart subject for the kanban (the drag'n drop ended) */
	dragEnd$ = new Subject<{ namespace: string, data: any }>();
	/** The itemEntered subject for the kanban (item entered a dropzone) */
	itemEntered$ = new Subject<{ namespace: string }>();
	/** The itemLeft subject for the kanban (item left a dropzone) */
	itemLeft$ = new Subject<{ namespace: string }>();

	constructor() { }

}
