import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionService } from '~shared/list-page/selection.service';


@Component({
	selector: 'app-test-kanban',
	templateUrl: './test-kanban.component.html',
	styleUrls: ['./test-kanban.component.scss'],
})
export class TestKanbanComponent implements OnInit {
	columns = [
		{
			id: 'test',
			name: 'test',
			items: [
				{
					id: 'item1',
					name: 'item1',
					cat: {
						id: 'test'
					}
				}
			]
		},
		{
			id: 'test1',
			name: 'test1',
			items: [
			]
		},
		{
			id: 'test2',
			name: 'test2',
			disabled: true,
			items: [
				{
					id: 'item2',
					name: 'item2',
					cat: {
						id: 'test2'
					}
				}
			]
		}
	];

	selected$: Observable<Map<string, boolean>>;

	constructor(protected selectionSrv: SelectionService) {

	}

	ngOnInit() {
		this.selected$ = this.selectionSrv.selection$;
	}

	getCurrentColumnFct(data) {
		return data.cat;
	}

	onItemDropped(evt) {
		console.log('>> onItemDropped - event = ', evt);
	}

	onItemSelected(item, flag) {
		console.log('>> onItemSelected - event = ', item);
		this.selectionSrv.selectOne(item);
	}

	onItemUnselected(item, flag) {
		console.log('>> onItemUnselected - event = ', item);
		this.selectionSrv.unselectOne(item);
	}

	selectAll(items, flag) {
		console.log('>> selectAll - event = ', items);
		this.selectionSrv.selectAll(items);
	}

	resetSelection(items) {
		console.log('>> resetSelection - evt = ', items);
		if (items) {
			items.forEach(item => this.selectionSrv.unselectOne(item));
		}
	}
}
