import { Injectable } from '@angular/core';

@Injectable()
export class KanbanService {
	dataTransfer: any;
	leavingBag: any;
	index: number;
	isDragging: boolean;

	constructor() { }

}
