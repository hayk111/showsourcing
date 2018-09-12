import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'bread-crumb-app',
	templateUrl: './bread-crumb.component.html',
	styleUrls: ['./bread-crumb.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadCrumbComponent extends BaseComponent implements OnInit {
	@Input() title: string;
	@Input() subtitles: Array<string> = [];
	constructor() {
    super();
  }

	ngOnInit() {}
}
