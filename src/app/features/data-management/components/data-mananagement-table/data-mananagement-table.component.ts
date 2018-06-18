import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '~models';
import { Observable } from 'rxjs';
import { Entity } from '~models';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMananagementTableComponent {
	@Input() categories: Array<Category>;
	@Input() selected: Map<string, boolean>;
	@Output() categorySelect = new EventEmitter<string>();
	@Output() categoryUnselect = new EventEmitter<string>();
	@Output() categorySelectAll = new EventEmitter<Map<string, boolean>>();
	@Output() categoryUnselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() categoryOpen = new EventEmitter<string>();


}
