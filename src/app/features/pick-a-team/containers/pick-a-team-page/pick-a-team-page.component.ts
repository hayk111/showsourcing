import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

}
