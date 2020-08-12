import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { SupplierRequestDialogComponent } from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Supplier } from '~core/erm3/models/supplier.model';
import { api } from 'showsourcing-api-lib';
import { DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub, log } from '~utils';


// Guest to the waiter: “Can you bring me what the lady at the next table is having?”
// -
// Waiter: “Sorry, sir, but I’m pretty sure she wants to eat it herself.”

@Component({
	selector: 'details-page-app',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
	host: { class: 'details-page' }
})
export class DetailsPageComponent extends AutoUnsub implements OnInit {

	supplier$: Observable<Supplier>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private toastSrv: ToastService,
		public dlgCommonSrv: DialogCommonService,
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
			switchMap(id => api.Supplier.get$(id).data$),
		) as any;

		this.supplier$.subscribe(
			supplier => this.onSupplier(supplier),
			err => this.onError(err)
		);

	}

	update(supplier: Supplier) {
		api.Supplier.update([supplier as any]);
	}

	delete(supplier: Supplier) {
		this.dlgCommonSrv.openConfirmDlg({
			text: this.translate.instant('message.confirm-delete-supplier')
		}).data$
		.pipe(
			switchMap(_ => api.Supplier.delete([{ id: supplier.id }]).local$)
		).subscribe(_ => this.router.navigate(['suppliers']));
	}

	export(supplier: Supplier) {
		this.dlgCommonSrv.openExportDlg('Supplier', [supplier]);
	}

	contact(supplier: Supplier) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { supplier });
	}

	// TODO: When we put that on the global service, remove from here
	onArchive(supplier: Supplier | Supplier[]) {
		if (Array.isArray(supplier)) {
			const updated = supplier.map((s: Supplier) => ({ id: s.id, archived: true }));
			api.Supplier.update([updated as any]).local$
				.subscribe(_ => {
					this.toastSrv.add({
						type: ToastType.SUCCESS,
						title: 'title.suppliers-archived',
						message: 'message.suppliers-archived-successfully'
					});
				});
		} else {
			const { id } = supplier;
			api.Supplier.update([{ id, archived: true }]).local$
				.subscribe(_ => {
					this.toastSrv.add({
						type: ToastType.SUCCESS,
						title: 'title.supplier-archived',
						message: 'message.supplier-archived-successfully'
					});
				});
		}
	}

	private onSupplier(supplier) {
		if (!supplier) {
			this.toastSrv.add({
				type: ToastType.ERROR,
				title: 'title.supplier-not-exist',
				timeout: 3500
			});
			this.router.navigate(['suppliers']);
		} else {
			if (supplier.supplierType) {
				supplier.supplierType.name = supplier.supplierType.name.toLowerCase().replace(' ', '-');
			}
		}
	}

	private onError(error: Error) {
		log.error(error);
		this.toastSrv.add({
			type: ToastType.ERROR,
			title: 'title.error',
			message: 'message.there-is-an-error',
			timeout: 3500
		});
		this.router.navigate(['suppliers']);
	}
}
