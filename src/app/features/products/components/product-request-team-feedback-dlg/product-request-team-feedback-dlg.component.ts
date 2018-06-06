import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';
import { TeamService } from '~features/products/services/team.service';


const addDlg = () => addDialog(ProductRequestTeamFeedbackDlgComponent, DialogName.REQUEST_FEEDBACK);

@Component({
	selector: 'product-request-team-feedback-dlg-app',
	templateUrl: './product-request-team-feedback-dlg.component.html',
	styleUrls: ['./product-request-team-feedback-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestTeamFeedbackDlgComponent implements OnInit {
	dialogName = DialogName.REQUEST_FEEDBACK;
	teamMembers$: Observable<Array<User>>;
	selectedMembers = {};
	selectedProducts: string[];
	get products() {
		return this.selectedProducts;
	}

	constructor(private dlgSrv: DialogService, private teamSrv: TeamService) { }

	ngOnInit() {
		this.teamMembers$ = this.teamSrv.selectTeamMembers();
	}

	select(id: string, user) {
		this.selectedMembers[id] = user;
	}

	unselect(id: string) {
		delete this.selectedMembers[id];
	}

	submit() {
		// this.store.dispatch(
		// 	productActions.requestFeedback(this.products, Object.keys(this.selectedMembers))
		// );
		this.dlgSrv.close(this.dialogName);
	}

}

addDlg();
