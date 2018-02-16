import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Vote } from '../../../../store/model/entities/vote.model';
import { User } from '../../../../store/model/entities/user.model';
import { selectUser } from '../../../../store/selectors/entities/user.selector';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'feedback-input-app',
	templateUrl: './feedback-input.component.html',
	styleUrls: ['./feedback-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackInputComponent extends AutoUnsub implements OnInit {
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
