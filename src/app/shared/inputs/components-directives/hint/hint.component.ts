import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'hint-app',
	templateUrl: './hint.component.html',
	styleUrls: ['./hint.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintComponent {
	@Input() align: 'left' | 'right' = 'left';
	constructor() { }


}
