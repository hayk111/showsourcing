import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { VoteByType } from '~store/selectors/target/target.selector';

@Component({
	selector: 'legend-app',
	templateUrl: './legend.component.html',
	styleUrls: ['./legend.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent implements OnInit {
	@Input() colorScheme;
	@Input() votes: VoteByType;
	constructor() {}

	ngOnInit() {}
}
