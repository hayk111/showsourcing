import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../models';

@Component({
	selector: 'filter-btn-app',
	templateUrl: './filter-btn.component.html',
	styleUrls: ['./filter-btn.component.scss']
})
export class FilterBtnComponent implements OnInit {
	@Input() title = '';
	@Output() btnClicked = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

	onBtnClick() {
		this.btnClicked.emit();
	}

}
