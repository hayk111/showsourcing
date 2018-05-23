import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'field-cell-app',
	templateUrl: './field-cell.component.html',
	styleUrls: ['./field-cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldCellComponent implements OnInit {
	@Input() label = '';
	constructor() { }

	ngOnInit() {
	}

}
