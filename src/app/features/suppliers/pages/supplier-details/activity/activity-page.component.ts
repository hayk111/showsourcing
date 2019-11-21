import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { CommentService, SupplierService } from '~core/entity-services';
import { SupplierFeatureService } from '../../../services/supplier-feature.service';
import { Comment, ERM, Product, Supplier } from '~models';
import { Contact } from '~models/contact.model';
import { AutoUnsub } from '~utils';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { CloseEvent, CloseEventType } from '~shared/dialog';

@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;
	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	contacts$: Observable<Contact[]>;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: SupplierFeatureService,
		private commentSrv: CommentService,
		private supplierSrv: SupplierService,
		public dlgCommonSrv: DialogCommonService
	) {
		super();
	}

	ngOnInit() {

		// getting the id of the supplier
		const id$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
		);

		// getting supplier
		this.supplier$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			tap(supplier => this.supplier = supplier)
		);

		// getting its products
		this.products$ = id$.pipe(
			switchMap(id => this.featureSrv.getProducts(id))
		);

		this.contacts$ = id$.pipe(
			switchMap(id => this.featureSrv.getContacts(id))
		);

	}

	/** updates supplier */
	update(supplier: Supplier) {
		this.featureSrv.update({ id: this.supplier.id, ...supplier })
			.subscribe();
	}

	sendComment(text: string) {
		const comment = new Comment({ text });
		const commentUser = { ...comment };
		const comments = [...(this.supplier.comments || [])];
		comments.push(commentUser);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.supplierSrv.update({ id: this.supplier.id, comments }))
		).subscribe();
	}

	goToProducts() {
		this.router.navigate(['suppliers', this.supplier.id, 'products']);
	}

	openSelectProductDlg(supplier) {
		this.dlgCommonSrv.openSelectProductDlg().pipe(
			filter((event: CloseEvent) => event.type === CloseEventType.OK)
		).subscribe(things => console.log(things));
	}

}
