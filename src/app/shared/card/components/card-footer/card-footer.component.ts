import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'card-footer-app',
	templateUrl: './card-footer.component.html',
	styleUrls: ['./card-footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFooterComponent implements OnInit {


	constructor() { }

	ngOnInit() {
	}

}
