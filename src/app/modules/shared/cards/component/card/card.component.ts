import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'card-app',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	// has card class and card2 class is added if border is true
	@HostBinding('class.card2')	@Input() border = false;

	constructor() { }

	ngOnInit() {
	}

}
