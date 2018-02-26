import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'pw-resetted-app',
	templateUrl: './pw-resetted.component.html',
	styleUrls: ['./pw-resetted.component.scss']
})
export class PwResettedComponent implements OnInit {
	@Output() back = new EventEmitter<any>();
	constructor() { }

	ngOnInit() {
	}

}
