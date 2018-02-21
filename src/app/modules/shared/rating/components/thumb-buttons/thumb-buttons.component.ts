import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'thumb-buttons-app',
	templateUrl: './thumb-buttons.component.html',
	styleUrls: ['./thumb-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbButtonsComponent extends AutoUnsub implements OnInit {
	@Output() vote = new EventEmitter<number>();
	@Input() color = 'white';

	constructor() {
		super();
	}

	ngOnInit() {
	}

	onClick(value: number) {
		this.vote.emit(value);
	}

}
