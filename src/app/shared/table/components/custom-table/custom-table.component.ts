import { Component, OnInit, Input, ChangeDetectionStrategy, ContentChild, Output, EventEmitter } from '@angular/core';
import { TableDescriptor, ColumnDirective } from '~app/shared/table';

@Component({
  selector: 'custom-table-app',
  templateUrl: './custom-table.component.html',
	styleUrls: ['./custom-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent implements OnInit {
	@Input() descriptor: TableDescriptor = [];
	@Input() rows: Array<any> = [];
	@Input() selection: Map<string, boolean>;
	@Output() itemOpen = new EventEmitter<string>();
	@Output() itemFavorited = new EventEmitter<string>();
	@Output() itemUnfavorited = new EventEmitter<string>();
	@Output() itemSelected = new EventEmitter<string>();
	@Output() itemUnselected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
	}

	onCheck(event, id) {
		if (event.target.checked)
			this.itemSelected.emit(id);
		else
			this.itemUnselected.emit(id);
	}

}
