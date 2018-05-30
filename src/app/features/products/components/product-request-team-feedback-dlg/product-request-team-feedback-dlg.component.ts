import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';


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
	// used to give props from the dialog container
	props = { selectedProducts: [] };
	get products() {
		return this.props.selectedProducts;
	}

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
		// this.teamMembers$ = this.store.select(fromTeamMember.selectArray);
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
