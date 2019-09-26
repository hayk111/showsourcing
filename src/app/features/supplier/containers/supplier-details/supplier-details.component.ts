import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { TaskService, UserService } from '~core/entity-services';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Product } from '~models';
import { Contact } from '~models/contact.model';
import { Supplier } from '~models/supplier.model';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, log } from '~utils';
import { TranslateService } from '@ngx-translate/core';

// Guest to the waiter: “Can you bring me what the lady at the next table is having?”
// -
// Waiter: “Sorry, sir, but I’m pretty sure she wants to eat it herself.”

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;

	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	contacts$: Observable<Contact[]>;
	taskCount$: Observable<number>;

	tabs: { name: string, number$?: Observable<number> }[];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: SupplierFeatureService,
		private notifSrv: NotificationService,
		public commonModalSrv: CommonModalService,
		private taskSrv: TaskService,
		private userSrv: UserService,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		this.supplier$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			tap(supplier => (this.supplier = supplier)),
		);

		this.supplier$.subscribe(
			supplier => this.onSupplier(supplier),
			err => this.onError(err)
		);

		this.taskCount$ = id$.pipe(
			switchMap(id => this.taskSrv
				.queryCount(`supplier.id == "${id}" AND assignee.id == "${this.userSrv.userSync.id}" AND done == false AND deleted == false`)),
			takeUntil(this._destroy$)
		);

		// getting the products
		this.products$ = id$.pipe(
			switchMap(id => this.featureSrv.getProducts(id))
		);

		this.contacts$ = id$.pipe(
			switchMap(id => this.featureSrv.getContacts(id)),
		);

		this.tabs = [
			{ name: 'activity' },
			{ name: 'products' },
			{ name: 'samples' },
			{ name: 'tasks', number$: this.taskCount$ }
		];

	}

	update(supplier: Supplier) {
		this.featureSrv.update(supplier).subscribe();
	}

	delete(supplier: Supplier) {
			this.commonModalSrv.openConfirmDialog({ text: this.translate.instant('message.confirm-delete-supplier') }).pipe(

			switchMap(_ => this.featureSrv.delete(supplier.id))
		).subscribe(_ => this.router.navigate(['supplier']));

	}

	export(supplier: Supplier) {
		this.products$.pipe(take(1)).subscribe((products: Product[]) => this.commonModalSrv.openExportDialog(products));
	}

	onSupplier(supplier) {
		if (!supplier) {
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: this.translate.instant('title.supplier-not-exist'),
				timeout: 3500
			});
			this.router.navigate(['supplier']);
		} else {
			if (supplier.supplierType) {
				supplier.supplierType.name = supplier.supplierType.name.toLowerCase().replace(' ', '-');
			}
			this.supplier = supplier;
		}
	}

	onError(error: Error) {
		log.error(error);
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: this.translate.instant('title.error'),
			message: this.translate.instant('message.there-is-an-error'),
			timeout: 3500
		});
		this.router.navigate(['supplier']);
	}
}
