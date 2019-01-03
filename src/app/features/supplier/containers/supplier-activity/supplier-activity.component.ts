import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Attachment, Comment, ERM, Product } from '~models';
import { Contact } from '~models/contact.model';
import { Supplier } from '~models/supplier.model';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-activity-app',
	templateUrl: './supplier-activity.component.html',
	styleUrls: ['./supplier-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex'
	}
})
export class SupplierActivityComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;
	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	contacts$: Observable<Contact[]>;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private featureSrv: SupplierFeatureService,
		private dlgSrv: DialogService,
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

		// getting his products
		this.products$ = id$.pipe(
			switchMap(id => this.featureSrv.getProducts(id))
		);

		this.contacts$ = id$.pipe(
			switchMap(id => this.featureSrv.getContacts(id))
		);

	}

	/** updates supplier */
	patch(supplier: Supplier) {
		this.featureSrv.update({ id: this.supplier.id, ...supplier })
			.subscribe();
	}

	openContactDlg(contact?: Contact) {
		if (contact)
			this.dlgSrv.open(NewContactDlgComponent, { isNewContact: false, contact, supplier: this.supplier });
		// new contact dlg
		else
			this.dlgSrv.open(NewContactDlgComponent, { isNewContact: true, supplier: this.supplier });
	}

	deleteContact(contact: Contact) {
		this.featureSrv.deleteContact(contact).subscribe();
	}

	/** when file has been removed we remove link */
	onFileRemoved(attachment: Attachment) {
		const attachments = this.supplier.attachments.filter(atc => atc.id !== attachment.id);
		this.featureSrv.update({ id: this.supplier.id, attachments }).subscribe();
	}
}
