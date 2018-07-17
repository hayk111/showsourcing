import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class KanbanService {
	dataTransfer: any;
	leavingBag: any;
	index: number;
	isDragging: boolean;

	constructor() { }

}
