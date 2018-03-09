import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'cell-two-row-app',
	templateUrl: './cell-two-row.component.html',
	styleUrls: ['./cell-two-row.component.scss'],
})
export class CellTwoRowComponent {
	@Input() title: string;

	@Input()
	@HostBinding('class.isFullHeight')
	isFullHeight = false;
}
