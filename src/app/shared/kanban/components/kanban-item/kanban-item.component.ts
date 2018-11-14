import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'kanban-item-app',
	templateUrl: './kanban-item.component.html',
	styleUrls: ['./kanban-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanItemComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
