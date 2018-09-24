import { Component, OnInit, NgModuleRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Contact, Product, Supplier, Attachment } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';
import { NotificationService, NotificationType } from '~shared/notifications';

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {
	supplier: Supplier;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: SupplierFeatureService,
		private notifSrv: NotificationService,
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>
		) {
			super();
		}

		ngOnInit() {
			const id$ = this.route.params.pipe(map(params => params.id));

			id$.subscribe(id => {
				this.featureSrv.selectOne(id).subscribe(
					_supplier => {
            if (Object.keys(_supplier).length === 0 || !_supplier) {
              this.notifSrv.add({
                type: NotificationType.ERROR,
                title: 'The supplier doesn\'t exist',
                timeout: 3500
              });
              this.router.navigate(['supplier']);
            } else {
              this.supplier = _supplier;
            }
					},
					err => {
            this.notifSrv.add({
              type: NotificationType.ERROR,
              title: 'Error',
              message: 'There is an error, please try again later',
              timeout: 3500
            });
            this.router.navigate(['supplier']);
					}
					);
				});
			}
		}
