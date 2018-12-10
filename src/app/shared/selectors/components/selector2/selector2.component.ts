import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'selector2-app',
	templateUrl: './selector2.component.html',
	styleUrls: ['./selector2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Selector2Component implements OnInit {

	@Input() value: any;
	@Input() type: string;
	@Input() multiple = false;
	@Input() canCreate = true;

	choices;

	constructor() { }

	ngOnInit() {
	}

}
