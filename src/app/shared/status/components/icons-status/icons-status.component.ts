import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product, ProductVote } from '~models';
import { UserService } from '~global-services';

@Component({
	selector: 'icons-status-app',
	templateUrl: './icons-status.component.html',
	styleUrls: ['./icons-status.component.scss'],
	host: {
		'[class.spacing-ms]': 'fullInfo'
	},
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
	/** whether we display the entire information or not */
	@Input() fullInfo = false;
	@Input() colorTxt = 'txt-secondary';

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
				this.dislike = false;
				this.name = 'thumbs-up-white';
			} else {
				this.dislike = true;
				this.like = false;
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
				'width': '16px',
				'height': '16px',
				'margin-top': '1px'
			};
		} else
			this.size = '14';
		return style;
	}

	get successTxt() {
		let color = 'color-' + this.colorTxt;
		if (this.dislike && !this.fullInfo)
			color = 'color-warn';
		else if (this.like && !this.fullInfo)
			color = 'color-success';
		return {
			color: `var(--${color})`
		};
	}

}
