import { Component, Input } from '@angular/core';

@Component({
	selector: 'cell-one-row-app',
	templateUrl: './cell-one-row.component.html',
	styleUrls: ['./cell-one-row.component.scss'],
})
export class CellOneRowComponent {
	@Input() title: string;
}
