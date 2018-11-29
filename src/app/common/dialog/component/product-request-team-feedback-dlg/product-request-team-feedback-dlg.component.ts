import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { User, TeamUser, Product } from '~models';
import { DialogService } from '~shared/dialog/services';
import { TeamService } from '~global-services';
import { take, map, switchMap, first, tap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { ProductDialogService } from '~common/dialog/services/product-dialog.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { NotificationService, NotificationType } from '~shared/notifications';


@Component({
	selector: 'product-request-team-feedback-dlg-app',
	templateUrl: './product-request-team-feedback-dlg.component.html',
	styleUrls: ['./product-request-team-feedback-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestTeamFeedbackDlgComponent extends TrackingComponent implements OnInit {

	teamMembers$: Observable<User[]>;
	@Input() selectedProducts: Product[];
	private selected = {};
	numSelected = 0;

	get products() {
		return this.selectedProducts;
	}

	constructor(
		private dlgSrv: DialogService,
		private productDlgSrv: ProductDialogService,
		private notificationSrv: NotificationService) {
		super();
	}

	ngOnInit() {
		this.teamMembers$ = this.productDlgSrv.selectTeamUsers();
	}

	select(id: string, user) {
		this.selected[id] = user;
		++this.numSelected;
	}

	unselect(id: string) {
		delete this.selected[id];
		--this.numSelected;
	}

	submit() {
		this.teamMembers$.pipe(
			first(),
			map(teamMembers => teamMembers.filter(teamMember => !!this.selected[teamMember.id])),
			switchMap(teamMembers => {
				return this.productDlgSrv.askFeedBackToUsers(teamMembers, this.selectedProducts);
			})
		).subscribe(
			r => {
				this.notificationSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Feedback requested',
					message: 'Your feedback request has been sent with success',
					timeout: 3500
				});
				this.dlgSrv.close();
			},
			e => {
				this.notificationSrv.add({
					type: NotificationType.ERROR,
					title: 'Feedback requested',
					message: 'Feedback request could not be sent, server issues',
					timeout: 3500
				});
				this.dlgSrv.close();
			}
		);
	}

}
