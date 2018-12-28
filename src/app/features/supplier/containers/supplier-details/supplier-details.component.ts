import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, takeUntil, tap, filter, first } from 'rxjs/operators';
import { ActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';
import { CommonModalService } from '~common/modals';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Product } from '~models';
import { Contact } from '~models/contact.model';
import { Supplier } from '~models/supplier.model';
import { TabModel } from '~shared/navbar';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';
import { CloseEventType } from '~shared/dialog';

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
	feedResult: ActivityFeed;

	tabs: TabModel[] = [
		{
			title: 'Activity',
			link: 'activity'
		},
		{
			title: 'Products',
			link: 'products'
		},
		{
			title: 'Tasks',
			link: 'tasks'
		}
	];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: SupplierFeatureService,
		private notifSrv: NotificationService,
		private activitySrv: ActivityService,
		public commonModalSrv: CommonModalService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(map(params => params.id));

		id$
			.pipe(
				switchMap((id: string) => this.featureSrv.selectOne(id)),
				takeUntil(this._destroy$)
			)
			.subscribe(
				supplier => this.onSupplier(supplier),
				err => this.onError(err)
			);

		this.supplier$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			tap(supplier => (this.supplier = supplier))
		);

		// getting his products
		this.products$ = id$.pipe(switchMap(id => this.featureSrv.getProducts(id)));

		this.contacts$ = id$.pipe(switchMap(id => this.featureSrv.getContacts(id)));

		this.feedResult = this.activitySrv.getSupplierFeed(
			this.route.parent.snapshot.params.id
		);
	}

	update(supplier: Supplier) {
		this.featureSrv.update(supplier).subscribe();
	}

	delete(supplier: Supplier) {
		this.commonModalSrv.openConfirmDialog({ text: 'are you sure you want to delete this supplier ?' }).pipe(
			filter(evt => evt.type === CloseEventType.OK),
			first(),
			switchMap(_ => this.featureSrv.delete(supplier.id))
		).subscribe(_ => this.router.navigate(['supplier', 'all']));

	}

	export(supplier: Supplier) {
		this.products$.pipe(take(1)).subscribe((products: Product[]) => this.commonModalSrv.openExportDialog(products));
	}

	onSupplier(supplier) {
		if (!supplier) {
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: 'The supplier doesn\'t exist',
				timeout: 3500
			});
			this.router.navigate(['supplier']);
		} else {
			this.supplier = supplier;
		}
	}

	onError(err) {
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: 'Error',
			message: 'There is an error, please try again later',
			timeout: 3500
		});
		this.router.navigate(['supplier']);
	}
}
