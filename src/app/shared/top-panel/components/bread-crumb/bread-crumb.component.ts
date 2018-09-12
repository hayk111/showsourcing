import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'bread-crumb-app',
	templateUrl: './bread-crumb.component.html',
	styleUrls: ['./bread-crumb.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadCrumbComponent extends TrackingComponent implements OnInit {
	@Input() title: string;
	@Input() subtitles: Array<string> = [];
	constructor() {
    super();
  }

	ngOnInit() {}
}
