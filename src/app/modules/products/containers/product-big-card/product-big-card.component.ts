import { selectProductFocused } from '@modules/products/store/selectors';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@modules/products/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
	selectCommentsArrayForCurrentTarget,
	selectNumCommentsForCurrentTarget,
	selectNumTasksForSelection,
} from '@store/selectors/target/target.selector';
import { AutoUnsub } from '@utils/index';
import { takeUntil, tap, switchMap, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { selectEntityById } from '@store/selectors/misc/utils.selector';
import { entityRepresentationMap } from '@store/utils/entities.utils';
import { FileTargetActions } from '@store/action/target/file.action';
import { AppFile } from '@store/model/entities/app-file.model';
import { UserService } from '@modules/user';
import { AppImage } from '@store/model/entities/app-image.model';
import { ImageTargetActions } from '@store/action/target/images.action';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-big-card-app',
	templateUrl: './product-big-card.component.html',
	styleUrls: ['./product-big-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductBigCardComponent extends AutoUnsub implements OnInit {
	product: Product;
	numComments: number;
	numTasks: number;
	user;

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		const product$ = this.store.select(selectProductFocused).pipe(filter((o: any) => o));
		product$.pipe(takeUntil(this._destroy$)).subscribe(p => (this.product = p));
		this.store
			.select(selectNumCommentsForCurrentTarget)
			.pipe(takeUntil(this._destroy$))
			.subscribe(n => (this.numComments = n));
		this.store
			.select(selectNumTasksForSelection)
			.pipe(takeUntil(this._destroy$))
			.subscribe(n => (this.numTasks = n));

		product$
			.pipe(
				map(product => ({ entityId: product.createdByUserId, entityRepr: entityRepresentationMap.teamMembers })),
				switchMap(target => this.store.select(selectEntityById(target)))
			)
			.subscribe(u => (this.user = u));
	}

	onFileDrop(files: Array<any>) {
		files.forEach(async file => {
			// this async stuff could probably be abstracted in the store.
			const img = await AppImage.newInstance(file, this.userSrv.getUserId());
			this.store.dispatch(ImageTargetActions.add(img));
		});
	}
}
