import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Project } from '~core/models';

@Component({
	selector: 'selector-project-row-app',
	templateUrl: './selector-project-row.component.html',
	styleUrls: ['./selector-project-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorProjectRowComponent implements OnInit {

	@Input() project: Project;

	constructor() { }

	ngOnInit() {
	}

}
