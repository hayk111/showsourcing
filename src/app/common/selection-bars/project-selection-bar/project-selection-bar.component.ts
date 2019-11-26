import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';

@Component({
	selector: 'project-selection-bar-app',
	templateUrl: './project-selection-bar.component.html',
	styleUrls: ['./project-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectionBarComponent implements OnInit {

	@Input() isShown = false;
	@Input() selection: Map<string, boolean>;
	@Input() count: number;
	@Output() close = new EventEmitter<null>();
	@Output() deleteSelected = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
