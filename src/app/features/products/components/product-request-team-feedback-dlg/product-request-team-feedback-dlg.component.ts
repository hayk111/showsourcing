import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromTeamMember } from '~app/entity/store/team-member/team-member.bundle';
import { Observable } from 'rxjs';
import { User } from '~app/entity';
import { DialogName, fromDialog } from '~app/shared/dialog';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { productActions } from '~app/features/products/store/product/product.action';


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

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.teamMembers$ = this.store.select(fromTeamMember.selectArray);
	}

	select(id: string, user) {
		this.selectedMembers[id] = user;
	}

	unselect(id: string) {
		delete this.selectedMembers[id];
	}

	submit() {
		this.store.dispatch(
			productActions.requestFeedback(this.products, Object.keys(this.selectedMembers))
		);
		this.store.dispatch(fromDialog.Actions.close(this.dialogName));
	}

}

addDlg();
