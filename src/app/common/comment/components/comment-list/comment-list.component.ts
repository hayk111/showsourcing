import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { Comment } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'comment-list-app',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent extends TrackingComponent implements OnInit {

	@Input() order: 'asc' | 'desc' = 'asc';

	@Input() hasViewMore = true;
	@Input() comments: Comment[] = [];
	/** index to keep track of which comments we display */
	amountShown = 0;

	constructor() {
		super();
	}

	ngOnInit() {
		// this._sorByProperty(this.comments, 'creationDate', this.order === 'asc');
		this.comments = this.order === 'asc' ? this.comments : this.comments.reverse();
		if (this.comments && this.comments.length > 0) {
			this.amountShown = this.comments.length;
			this.showMore();
		}
	}

	/** index gets decreased by 2, this way each time we call this function, we
	 * will be able to see 2 more items until the index is 0
	 */
	showMore() {
		this.amountShown = this.amountShown >= 2 ? this.amountShown - 2 : 0;
	}

	private _getProperty(propertyName: string, object: any ) {
		const parts = propertyName.split( '.' );
		const length = parts.length;
		let  property = object || '';
		for ( let i = 0; i < length; i++ ) {
			property = property[parts[i]];
		}
		return property;
	}

	private _sorByProperty(arr: any[], propName: string, isOrderASC: boolean): any[]  {
		const that = this;
		if (typeof that._getProperty(propName, arr[0]) === 'string') {
			arr.sort(function (a, b) {
				const valueA = that._getProperty(propName, a);
				const valueB = that._getProperty(propName, b);
				return valueA.localeCompare(valueB, 'en', {ignorePunctuation: true, sensitivity: 'base'});
			});
		} else {
			arr.sort((a, b) => {
				const valueA = that._getProperty(propName, a);
				const valueB = that._getProperty(propName, b);
				return valueA - valueB;
			});
		}

		if (!isOrderASC) {
			arr.reverse();
		}
		return arr;
	}
}
