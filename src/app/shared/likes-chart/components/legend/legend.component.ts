import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'legend-app',
	templateUrl: './legend.component.html',
	styleUrls: ['./legend.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent implements OnInit {
	@Input() colorScheme;
	@Input() votes: any;
	constructor() {}

	ngOnInit() {}
}
