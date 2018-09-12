import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { User, TeamUser, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { TeamService } from '~global-services';
import { take, map, switchMap, first } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { ProductDialogService } from '~shared/custom-dialog/services/product-dialog.service';
import { BaseComponent } from '~shared/base-component/base-component';


@Component({
	selector: 'product-request-team-feedback-dlg-app',
	templateUrl: './product-request-team-feedback-dlg.component.html',
	styleUrls: ['./product-request-team-feedback-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestTeamFeedbackDlgComponent extends BaseComponent implements OnInit {
	teamMembers$: Observable<User[]>;
	private selected = {};
	@Input() selectedProducts: Product[];

	get products() {
		return this.selectedProducts;
	}

	constructor(private dlgSrv: DialogService, private productDlgSrv: ProductDialogService) {
    super();
  }

	ngOnInit() {
		this.teamMembers$ = this.productDlgSrv.selectTeamUsers();
	}

	select(id: string, user) {
		this.selected[id] = user;
	}

	unselect(id: string) {
		delete this.selected[id];
	}

	submit() {
		this.teamMembers$.pipe(
			first(),
			map(teamMembers => teamMembers.filter(teamMember => !!this.selected[teamMember.id])),
			switchMap(teamMembers => {
				return this.productDlgSrv.askFeedBackToUsers(teamMembers, this.selectedProducts);
			})
		).subscribe(projects => {
			this.dlgSrv.close();
		});
	}

}
