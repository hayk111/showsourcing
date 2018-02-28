import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { TableDescriptor } from '~app/shared/table';

@Component({
  selector: 'custom-table-app',
  templateUrl: './custom-table.component.html',
	styleUrls: ['./custom-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent implements OnInit {
	@Input() descriptor: TableDescriptor = [];
	@Input() rows: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
