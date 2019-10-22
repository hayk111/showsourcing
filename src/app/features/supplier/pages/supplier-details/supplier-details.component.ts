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
import { DialogService } from '~shared/dialog';
import { SupplierRequestDialogComponent } from '~common/modals/custom/supplier-request-dialog/supplier-request-dialog.component';

// Guest to the waiter: “Can you bring me what the lady at the next table is having?”
// -
// Waiter: “Sorry, sir, but I’m pretty sure she wants to eat it herself.”

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {

	supplier$: Observable<Supplier>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: SupplierFeatureService,
		private notifSrv: NotificationService,
		public commonModalSrv: CommonModalService,
		private translate: TranslateService,
		private dlgSrv: DialogService
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
		);

		this.supplier$.subscribe(
			supplier => this.onSupplier(supplier),
			err => this.onError(err)
		);

	}

	update(supplier: Supplier) {
		this.featureSrv.update(supplier).subscribe();
	}

	delete(supplier: Supplier) {
		this.commonModalSrv.openConfirmDialog({
			text: this.translate.instant('message.confirm-delete-supplier')
		}).pipe(
			switchMap(_ => this.featureSrv.delete(supplier.id))
		).subscribe(_ => this.router.navigate(['supplier']));
	}

	export(supplier: Supplier) {
		this.commonModalSrv.openExportDialog([supplier]);
	}

	contact(supplier: Supplier) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { supplier });
	}

	// TODO: When we put that on the global service, remove from here
	onArchive(supplier: Supplier | Supplier[]) {
		if (Array.isArray(supplier)) {
			this.featureSrv.updateMany(supplier.map((s: Supplier) => ({ id: s.id, archived: true })))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.suppliers-archived'),
						message: this.translate.instant('message.suppliers-archived-successfully')
					});
				});
		} else {
			const { id } = supplier;
			this.featureSrv.update({ id, archived: true })
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.supplier-archived'),
						message: this.translate.instant('message.supplier-archived-successfully')
					});
				});
		}
	}
	private onSupplier(supplier) {
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
		}
	}

	private onError(error: Error) {
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
