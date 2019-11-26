import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';

@Component({
	selector: 'supplier-selection-bar-app',
	templateUrl: './supplier-selection-bar.component.html',
	styleUrls: ['./supplier-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierSelectionBarComponent implements OnInit {

	@Input() isShown = false;
	@Input() selection: Map<string, boolean>;
	@Input() count: number;
	@Input() favorite: boolean;
	@Input() allSelectedFavorite: boolean;
	@Output() close = new EventEmitter<null>();
	@Output() deleteSelected = new EventEmitter<null>();
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() statusUpdated = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

}
