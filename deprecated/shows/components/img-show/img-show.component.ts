import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppImage, Show } from '~models';

@Component({
	selector: 'img-show-app',
	templateUrl: './img-show.component.html',
	styleUrls: ['./img-show.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgShowComponent implements OnInit {
	@Input() show: Show;
	constructor() { }

	ngOnInit() {
	}


	getGradient() {
		return `linear-gradient(${this.show.description.secondaryColor}, ${this.show.description.primaryColor})`;
	}

}
