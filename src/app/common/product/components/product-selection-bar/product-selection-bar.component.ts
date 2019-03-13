import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { Project } from '~core/models';

@Component({
	selector: 'product-selection-bar-app',
	templateUrl: './product-selection-bar.component.html',
	styleUrls: ['./product-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSelectionBarComponent implements OnInit {

	@Input() isShown = false;
	@Input() selection: Map<string, boolean>;
	@Output() close = new EventEmitter<null>();
	@Output() compareProducts = new EventEmitter<null>();
	@Output() export = new EventEmitter<null>();
	@Output() deleted = new EventEmitter<null>();
	@Output() addProject = new EventEmitter<Project[]>();
	@Output() liked = new EventEmitter<boolean>();
	@Output() disliked = new EventEmitter<boolean>();
	@Output() favorited = new EventEmitter<null>();
	@Output() unfavorited = new EventEmitter<null>();
	@Output() statusUpdated = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

}
