import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '~core/erm';
import { api, Typename } from 'showsourcing-api-lib';
import { Sample, Task } from '~core/erm3';

@Component({
	selector: 'product-main-app',
	templateUrl: './product-main.component.html',
	styleUrls: ['./product-main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMainComponent {
	@Input() product: Product;
	@Input() set section(fragment: string) {
		this._section = fragment;
	}
	get section() {
		return this._section;
	}
	@Input() samples: Sample[];
	@Input() tasks: Task[];
	@Input() comments: Comment[];

	_section = 'info';

	constructor() {}

	onRouteChange(fragment: string) {
		this.section = fragment;
	}

}
