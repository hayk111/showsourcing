import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '~core/erm';
import { api, Typename } from 'showsourcing-api-lib';

@Component({
	selector: 'product-main-app',
	templateUrl: './product-main.component.html',
	styleUrls: ['./product-main.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMainComponent implements OnInit {
	@Input() product: Product;
	@Input() set section(fragment: string) {
		this._section = fragment;
	}
	get section() {
		return this._section;
	}

	_section = 'info';

	sampleCount$: Observable<number>;
	taskCount$: Observable<number>;
	commentCount$: Observable<number>;

	constructor() {}

	ngOnInit() {
		this.sampleCount$ = api.Sample.findByProduct$(this.product.id).count$;
		this.taskCount$ = api.Task.findByProduct$(this.product.id).count$;
		this.commentCount$ =  api.Comment.findByNodeId$('Product:' + this.product.id).count$;
	}

	onRouteChange(fragment: string) {
		this.section = fragment;
	}

}
