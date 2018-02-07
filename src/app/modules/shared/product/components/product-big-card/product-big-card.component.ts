import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../store/model/entities/product.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectProductSelected, selectCommentsArrayForSelection, selectNumCommentsForSelection,
	selectNumTasksForSelection } from '../../../../store/selectors/selection/selection.selector';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { takeUntil, tap, switchMap, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { selectEntityById } from '../../../../store/selectors/misc/utils.selector';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { FileSlctnActions } from '../../../../store/action/selection/file-selection.action';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { UserService } from '../../../user/services/user.service';
import { AppImage } from '../../../../store/model/entities/app-image.model';
import { ImageSlctnActions } from '../../../../store/action/selection/images-selection.action';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
	selector: 'product-big-card-app',
	templateUrl: './product-big-card.component.html',
	styleUrls: ['./product-big-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
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
		const product$ = this.store.select(selectProductSelected).pipe(filter((o: any) => o));
		product$.pipe(takeUntil(this._destroy$)).subscribe(p => this.product = p);
		this.store.select(selectNumCommentsForSelection)
			.pipe(takeUntil(this._destroy$)).subscribe(n => this.numComments = n);
		this.store.select(selectNumTasksForSelection)
			.pipe(takeUntil(this._destroy$)).subscribe(n => this.numTasks = n);

		product$.pipe(
			map(product => ({entityId: product.createdByUserId, entityRepr: entityRepresentationMap.teamMembers })),
			switchMap(target => this.store.select(selectEntityById(target)))
		).subscribe(u => this.user = u);
	}

	onFileDrop(files: Array<any>) {
		files.forEach( async (file) => {
			// this async stuff could probably be abstracted in the store.
			const img = await AppImage.newInstance(file, this.userSrv.getUserId());
			this.store.dispatch(ImageSlctnActions.add(img));
		});
	}

}
