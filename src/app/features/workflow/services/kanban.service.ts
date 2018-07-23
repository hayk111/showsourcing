import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class KanbanService {
	dataTransfer: any;
	leavingBag: any;
	index: number;
	isDragging: boolean;

	dragStart$ = new Subject<{ namespace: string, data: any }>();
	dragEnd$ = new Subject<{ namespace: string, data: any }>();

	constructor() { }

}
