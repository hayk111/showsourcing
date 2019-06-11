import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '~models/supplier.model';
import { Contact } from '~models/contact.model';
import { Product, Attachment } from '~models';
import { AutoUnsub } from '~utils';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { DialogService } from '~shared/dialog/services';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { ActivityService } from '~common/activity/services/activity.service';
import { ActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { NotificationService, NotificationType } from '~shared/notifications';


@Component({
	selector: 'supplier-general-info-app',
	templateUrl: './supplier-general-info.component.html',
	styleUrls: ['./supplier-general-info.component.scss']
})
export class SupplierGeneralInfoComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;
	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	contacts$: Observable<Contact[]>;
	feedResult: ActivityFeed;


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: SupplierFeatureService,
		private dlgSrv: DialogService,
		private activitySrv: ActivityService,
		private notifSrv: NotificationService,
	) {
		super();
	}

	ngOnInit() {

		// getting the id of the supplier
		const id$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
		);

		id$.pipe(
			switchMap((id: string) => this.featureSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(
			supplier => this.onSupplier(supplier),
			err => this.onError(err)
		);
	}

	/** updates supplier */
	patch(supplier: Supplier) {
		this.featureSrv.update({ id: this.supplier.id, ...supplier })
			.subscribe();
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
