import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'kanban-col-app',
	templateUrl: './kanban-col.component.html',
	styleUrls: ['./kanban-col.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanColComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
