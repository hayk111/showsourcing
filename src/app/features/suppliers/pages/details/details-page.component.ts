import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, tap, switchMap, takeUntil } from 'rxjs/operators';
import { SupplierRequestDialogComponent } from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { api, Supplier, SupplierTag, Sample, Task } from 'showsourcing-api-lib';
import { DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub, log } from '~utils';
import { tapOnce } from '~shared/utils';

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

	supplier: Supplier;
	supplierId: string;

	samples$: Observable<Sample[]>;
	tasks$: Observable<Task[]>;

	supplierTags: SupplierTag[];
	section = 'activity';

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
			tap(id => this.supplierId = id),
			switchMap(() => api.SupplierTag.find$({filter: { property: 'supplier', isString: this.supplierId }}).data$),
			map((supplierTags: SupplierTag[]) => supplierTags.map(supplierTag => supplierTag.tag)),
			tap((tags: SupplierTag[]) => {
				this.supplierTags = tags;
			}),
			tapOnce(_ => this.samples$ = api.Sample.findBySupplier$(this.supplierId).data$),
			tapOnce(_ => this.tasks$ = api.Task.findBySupplier$(this.supplierId).data$),
			switchMap(id => api.Supplier.get$(this.supplierId).data$),
			takeUntil(this._destroy$)
		).subscribe(
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
			this.supplier = supplier;
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
