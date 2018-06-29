import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'project-settings-app',
	templateUrl: './project-settings.component.html',
	styleUrls: ['./project-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSettingsComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
