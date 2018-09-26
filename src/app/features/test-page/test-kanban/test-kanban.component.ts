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
			name: 'test',
			items: [
				{
					name: 'item1'
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
}
