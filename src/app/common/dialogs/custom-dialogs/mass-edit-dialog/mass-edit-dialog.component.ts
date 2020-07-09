import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	ChangeDetectorRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { UserService } from '~core/auth';
import { Typename } from '~core/erm3/typename.type';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { cache } from 'showsourcing-api-lib';

@Component({
	selector: 'mass-edit-dialog-app',
	templateUrl: './mass-edit-dialog.component.html',
	styleUrls: ['./mass-edit-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MassEditDialogComponent extends AutoUnsub implements OnInit {
	@Input() typename: Typename;
	@Input() items: any[];

	choiceSelected: string;
	userVote: any;

	// object to specify which field must be updated with which value.
	toUpdate: { callback: string; property: string; value: any };
	fieldsChoice: any[] = [
		{ label: 'Name', property: 'name', type: 'string' },
		// { label: '...', property: 'custom', type: 'descriptor' },
		{ label: 'Supplier', property: 'supplierId', type: 'selector', typename: 'Supplier' },
		{
			label: 'Category',
			property: 'categoryId',
			type: 'selector',
			typename: 'PropertyOption',
			typePropertyOption: 'CATEGORY',
		},
		{
			label: 'Tags',
			property: 'tagIds',
			type: 'selector',
			typename: 'PropertyOption',
			typePropertyOption: 'Tag',
		},
		{ label: 'Assignee', property: 'assigneeId', type: 'selector', typename: 'User' },
		{ label: 'Rating', property: 'rating', type: 'rating' },
		{ label: 'Status', property: 'status', type: 'status' },
	];

	fakeVotes = [];

	propertySelected$ = new Subject<any>();
	propertySelected: any;
	constructor(
		public dlgSrv: DialogService,
		private userSrv: UserService,
		protected cdRef: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		console.log('MassEditDialogComponent -> ngOnInit -> this.typename', this.typename, this.items);
		this.propertySelected$.subscribe(selected => (this.propertySelected = selected));
	}

	/** Select a property to update */
	setPropertySelected(itemSelected) {
		this.choiceSelected = itemSelected.label;
		this.propertySelected$.next(itemSelected);
	}

	/** prepare the data to know what we have to update outside this dialog. */
	setProperty(type: string, value: any, property?: string) {
		this.toUpdate = { callback: type + 'Update', property, value: value };
	}

	setRating(rating) {
		const fakeVote = { voteCreatedById: this.userSrv.userId, rating };
		this.fakeVotes = [fakeVote];
		this.toUpdate = { callback: 'ratingUpdate', property: 'votes', value: fakeVote };
	}

	setSelector(value: any) {
		const property = this.propertySelected;
		this.toUpdate = { callback: property.type.toLowerCase() + 'Update', property, value: value };
		if (property.property === 'supplierId') {
			this.toUpdate.value = cache.get('Supplier', value.supplierId);
		} else if (property.property === 'categoryId') {
			this.toUpdate.value = cache.get('PropertyOption', value.categoryId);
		}
		// TODO add productTag, assignee
	}

	update() {
		if (!this.toUpdate) {
			return;
		}
		this.dlgSrv.data(this.toUpdate);
		this.dlgSrv.close();
	}

	cancel() {
		this.dlgSrv.cancel();
	}
}
