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

	section = 'info';
	sampleCount$: Observable<number>;
	taskCount$: Observable<number>;
	commentCount$: Observable<number>;

	constructor() {}

	ngOnInit() {
		this.section = this.urlHash;
		this.sampleCount$ = api.Sample.findByProduct$(this.product.id).count$;
		this.taskCount$ = api.Task.findByProduct$(this.product.id).count$;
		this.commentCount$ =  api.Comment.findByNodeId$('Product:' + this.product.id).count$;
	}

	@HostListener('window:hashchange')
	onHashChange() {
		this.section = this.urlHash;
	}

	onRouteChange(fragment: string) {
		this.section = fragment;
		this.urlHash = this.section;
	}

	get urlHash() {
		return window.location.hash.replace('#', '');
	}

	set urlHash(fragment: string) {
		window.location.hash = fragment;
	}
}
