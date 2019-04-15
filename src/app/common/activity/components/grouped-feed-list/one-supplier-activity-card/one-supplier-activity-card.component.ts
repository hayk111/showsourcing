import {
	Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter,
	NgModuleRef, ViewChild, ElementRef
} from '@angular/core';
import { Supplier, ERM, Comment } from '~models';
import { Router } from '@angular/router';
import { DialogService } from '~shared/dialog/services';
import { ProductAddToProjectDlgComponent } from '~common/modals/component';
import { DEFAULT_IMG, AutoUnsub } from '~utils';
import { InputDirective } from '~shared/inputs';
import { Observable } from 'rxjs';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { takeUntil } from 'rxjs/operators';
import { SupplierService } from '~entity-services';
import { FormControl } from '@angular/forms';
import { CommentService } from '~core/entity-services/comment/comment.service';

@Component({
	selector: 'one-supplier-activity-card-app',
	templateUrl: './one-supplier-activity-card.component.html',
	styleUrls: ['./one-supplier-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneSupplierActivityCardComponent extends AutoUnsub implements OnInit {

	@Input() groupFeed: GetStreamGroup;
	@Input() title: string;
	@Output() createComment = new EventEmitter<{ comment: any, entity: any, erm: any }>();
	@Output() update = new EventEmitter<Supplier>();
	@ViewChild(InputDirective) inp: InputDirective;
	supplier$: Observable<Supplier>;
	supplier: Supplier;
	commentCtrl = new FormControl('');
	typeEntity = ERM.SUPPLIER;

	constructor(
		private router: Router,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private supplierSrv: SupplierService,
		private commentSrv: CommentService) {
		super();
	}

	ngOnInit() {
		const group = this.groupFeed.group;
		// when an activity group starts with product_activity, what's following is the id
		if (group.startsWith('supplier_activity')) {
			const supplierId = group.replace('supplier_activity_', '');
			this.supplier$ = this.supplierSrv.queryOne(supplierId);
		}
		// when it starts with create_product, we can get the supplier id by looking at the first activity
		if (group.startsWith('create_supplier')) {
			this.supplier$ = this.supplierSrv.queryOne(this.groupFeed.activities[0].object);
		}
		this.supplier$.pipe(takeUntil(this._destroy$)).subscribe(supplier => this.supplier = supplier);
	}

	onFavorite() {
		this.updateSupplier({ id: this.supplier.id, favorite: true });
	}

	onUnfavorite() {
		this.updateSupplier({ id: this.supplier.id, favorite: false });
	}

	updateSupplier(supplier: Supplier) {
		this.update.emit(supplier);
		// since optimistic ui isn't working yet, let's modify the supplier locally
		this.supplier = { ...this.supplier, ...supplier };
	}

	onViewSupplier() {
		this.router.navigate(['supplier', this.supplier.id]);
	}

	onEnter(event) {
		event.preventDefault();
		this.onSubmit();
	}

	onSubmit() {
		const comment = new Comment({ text: this.commentCtrl.value });
		this.commentSrv.create(comment);
		this.createComment.emit({ comment, entity: this.supplier, erm: ERM.SUPPLIER });
		this.commentCtrl.reset();
	}

}
