import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { AppImage, ImageActions } from '~features/file';
import { Product } from '~products/models';
import { selectProductById, selectProductFocused } from '~products/store';
import {
	selectNumCommentsForCurrentTarget,
	selectNumTasksForSelection,
} from '~store/selectors/target/target.selector';
import { UserService } from '~user';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-big-card-app',
	templateUrl: './product-big-card.component.html',
	styleUrls: ['./product-big-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductBigCardComponent extends AutoUnsub implements OnInit {
	product: Product;
	user;

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		const product$: Observable<Product> = this.store.select(selectProductFocused).pipe(filter((o: any) => o));
		product$.pipe(takeUntil(this._destroy$)).subscribe(p => (this.product = p));

		product$
			// .pipe(switchMap(target => this.store.select(selectProductById(target.id))))
			.subscribe(u => (this.user = u));
	}

	onFileDrop(files: Array<any>) {
		files.forEach(async file => {
			// this async stuff could probably be abstracted in the store.
			const img = await AppImage.newInstance(file, this.userSrv.userId);
			this.store.dispatch(ImageActions.add([img]));
		});
	}
}
