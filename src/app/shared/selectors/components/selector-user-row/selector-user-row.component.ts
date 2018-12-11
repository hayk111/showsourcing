import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '~core/models';

@Component({
	selector: 'selector-user-row-app',
	templateUrl: './selector-user-row.component.html',
	styleUrls: ['./selector-user-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorUserRowComponent implements OnInit {

	@Input() user: User;

	constructor() { }

	ngOnInit() {
	}

}
