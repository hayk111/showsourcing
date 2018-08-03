import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product, ProductVote } from '~models';
import { UserService } from '~global-services';

@Component({
	selector: 'icons-status-app',
	templateUrl: './icons-status.component.html',
	styleUrls: ['./icons-status.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsStatusComponent implements OnInit {

	@Input() set product(product: Product) {
		this.userVote = (product.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
		this._product = product;
	}
	get product() {
		return this._product;
	}
	@Input() favorite = false;

	name = 'thumbs-up';
	size = '9';
	like = false;
	dislike = false;
	private _product: Product;
	userVote: ProductVote;

	constructor(private userSrv: UserService) { }

	ngOnInit() {
		if (this.userVote) {
			if (this.userVote.value === 100) {
				this.like = true;
				this.name = 'thumbs-up-white';
			} else {
				this.dislike = true;
				this.name = 'thumbs-down-white';
			}
		}
	}

	get successStyle() {
		const state = this.like ? 'success' : this.dislike ? 'warn' : '';
		let style = {};
		if (state) {
			this.size = '9';
			style = {
				background: `var(--color-${state})`,
				'border-radius': '50%',
				'width': '17px',
				'height': '17px',
				'margin-top': '2px',
			};
		} else {
			this.size = '14';
			style = {
				'margin-top': '2px'
			};
		}
		return style;
	}

}
