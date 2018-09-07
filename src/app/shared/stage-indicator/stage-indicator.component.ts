import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'stage-indicator-app',
	templateUrl: './stage-indicator.component.html',
	styleUrls: ['./stage-indicator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StageIndicatorComponent extends BaseComponent implements OnInit {

	@Input() titles: Array<string>;
	@Input() index: number;

	constructor() {
    super();
  }

	ngOnInit() {
	}

}
