import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'banner-task-app',
	templateUrl: './banner-task.component.html',
	styleUrls: ['./banner-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerTaskComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
