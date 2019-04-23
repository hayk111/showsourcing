import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ProductDialogService } from '~common/modals/services/product-dialog.service';
import { Product, User } from '~models';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';
import { TrackingComponent } from '~utils/tracking-component';


@Component({
	selector: 'product-request-team-feedback-dlg-app',
	templateUrl: './product-request-team-feedback-dlg.component.html',
	styleUrls: ['./product-request-team-feedback-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestTeamFeedbackDlgComponent extends TrackingComponent implements OnInit {

	teamMembers$: Observable<User[]>;
	@Input() products: Product[];
	selected = {};
	numSelected = 0;


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
				return this.productDlgSrv.askFeedBackToUsers(teamMembers, this.products);
			})
			// TODO i18n
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
