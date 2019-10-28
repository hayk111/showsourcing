import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'moq-app',
	templateUrl: './moq.component.html',
	styleUrls: ['./moq.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoqComponent {
	@Input() moq: number;
	@Input() moqDescription: string;

	constructor() { }

}
