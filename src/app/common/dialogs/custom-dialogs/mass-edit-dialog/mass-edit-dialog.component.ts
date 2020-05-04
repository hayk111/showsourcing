import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Typename } from '~core/erm3/typename.type';
import { DialogService } from '~shared/dialog';
import { RatingService } from '~shared/rating/services/rating.service';
import { ToastService } from '~shared/toast';
import { AutoUnsub } from '~utils';
import { ReplaySubject, Subject } from 'rxjs';
import { UserService } from '~core/auth';

@Component({
	selector: 'mass-edit-dialog-app',
	templateUrl: './mass-edit-dialog.component.html',
	styleUrls: ['./mass-edit-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MassEditDialogComponent extends AutoUnsub implements OnInit {
	@Input() typename: Typename;
	@Input() items: any[];

	// object to specify which field must be updated with which value.
	toUpdate: { callback: string; property: string; value: any };
	fieldsChoice: any[] = [
		{ label: 'Name', property: 'name', type: 'string' },
		{ label: '...', property: 'custom', type: 'descriptor' },
		{ label: 'Supplier', property: 'supplierId', type: 'selector', typename: 'Supplier' },
		{ label: 'Category', property: 'categoryId', type: 'selector', typename: 'PropertyOption', typePropertyOption: 'Category' },
		{ label: 'Tags', property: 'tagIds', type: 'selector', typename: 'PropertyOption', typePropertyOption: 'Tag' },
		{ label: 'Assignee', property: 'assigneeId', type: 'selector', typename: 'User' },
		{ label: 'Rating', property: 'rating', type: 'rating' },
		{ label: 'Status', property: 'status', type: 'status' },
	];

	fakeVotes = [];
	// private _productDescriptor: ProductDescriptor;

	// first selector : the property we want to update. Used to ngSwitch the good component.
	propertySelected$ = new Subject<any>();
	propertySelected: any;
	constructor(
		private dlgSrv: DialogService,
		private ratingSrv: RatingService,
		private notificationSrv: ToastService,
		private translate: TranslateService,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
		this.propertySelected$.subscribe(selected => (this.propertySelected = selected));
	}

	/** prepare the data to know what we have to update outside this dialog. */
	setProperty(type: string, value: any, property?: string) {
		this.toUpdate = { callback: type + 'Update', property, value: value };
	}

	/** Select a property to update */
	setPropertySelected(itemSelected) {
		this.propertySelected$.next(itemSelected);
	}

	setRating(rating) {
		const fakeVote = {voteCreatedById: this.userSrv.userId, rating};
		this.fakeVotes = [fakeVote];
		this.toUpdate = { callback: 'ratingUpdate', property: 'votes', value: fakeVote };
	}

	update() {
		this.dlgSrv.data(this.toUpdate);
	}

	cancel() {
		this.dlgSrv.cancel();
	}
}
