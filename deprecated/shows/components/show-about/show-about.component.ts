import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Show } from '~models';

@Component({
	selector: 'show-about-app',
	templateUrl: './show-about.component.html',
	styleUrls: ['./show-about.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowAboutComponent implements OnInit {
	@Input() show: Show;
	constructor() { }

	ngOnInit() {
	}

}
