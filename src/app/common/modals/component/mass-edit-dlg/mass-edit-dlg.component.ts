import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ProductService } from '~core/entity-services';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { EntityMetadata, ERM, ExtendedFieldDefinition, productFields } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { PickerField } from '~shared/selectors';
import { AutoUnsub, translate, uuid } from '~utils';

@Component({
	selector: 'mass-edit-dlg-app',
	templateUrl: './mass-edit-dlg.component.html',
	styleUrls: ['./mass-edit-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MassEditDlgComponent extends AutoUnsub implements OnInit {

	@Input() type: EntityMetadata;
	@Input() items: any[];

	pickerFields: PickerField[] = productFields;
	erm = ERM;
	choice$: ReplaySubject<PickerField> = new ReplaySubject<PickerField>(1);
	definitions$: Observable<ExtendedFieldDefinition[]>;
	value: any;
	like = false;
	dislike = false;
	pending = false;

	constructor(
		private extendedFDSrv: ExtendedFieldDefinitionService,
		private productSrv: ProductService,
		private dlgSrv: DialogService,
		private thumbSrv: ThumbService,
		private notificationSrv: NotificationService
	) { super(); }

	ngOnInit() {
		switch (this.type) {
			case ERM.PRODUCT:
				this.pickerFields = productFields;
				this.definitions$ = this.extendedFDSrv.queryMany({ query: 'target == "product.extendedFields"', sortBy: 'order' });
				break;
			default: throw Error(`No PickerField associated to this ERM ${this.type}`);
		}
	}

	updateChoice(choice) {
		const temp = this.pickerFields.find(field => field.name === choice);
		this.choice$.next(temp || null);
		this.value = null;
	}

	getName(type) {
		let name;
		const entityName = ERM.getEntityMetadata(type);
		switch (entityName) {
			case ERM.USER:
				const firstName = this.value && this.value.firstName ? this.value.firstName : '';
				const lastName = this.value && this.value.lastName ? this.value.lastName : '';
				name = firstName + (lastName ? ' ' : '') + lastName;
				break;
			default:
				name = this.value && this.value.name ? this.value.name : '';
				break;
		}
		return name;
	}

	statusUpdated(item) {
		// this condition exists since input price, when blur drop a change that returns the element in the DOM
		// instead of the price object. This way we don't store the DOM element
		if (item && item.__proto__.constructor.name !== 'Event')
			this.value = item;
	}

	getMultipleName() {
		const name = (this.value || []).map(val => val.name).join(', ');
		return name;
	}

	update() {
		this.pending = true;
		this.choice$.pipe(
			takeUntil(this._destroy$),
			map(choice => this.mapItems(choice)),
			switchMap(items => this.productSrv.updateMany(items))
		).subscribe(_ => {
			this.pending = true;
			this.close();
			this.notificationSrv.add({
				type: NotificationType.SUCCESS,
				title: translate('Multiple edition'),
				message: translate('Your items have been updated'),
				timeout: 3500
			});
		});

	}

	private mapItems(choice: PickerField) {
		const prop = choice.attribute || choice.name;
		let mapped;
		// checks if the type needs to update the id's so they don't share the same entity (Price, ExtendedField, Packaging)
		// since the relationship on this objects is 1 - 1
		if (this.resetId(choice))
			mapped = this.items.map(item => {
				// if its an array we have to update the ids of all the elements inside the array
				if (Array.isArray(this.value))
					this.value = this.value.map(val => ({ ...val, id: uuid() }));
				// otherwise we only update the object
				else
					this.value = { ...this.value, id: uuid() };
				return ({ id: item.id, [prop]: this.value });
			});
		else
			mapped = this.items.map(item => {
				let auxVal = this.value;
				// since the votes are complex and it has its own service, we have to make this condition here
				// the votes are an array, so we have to put this condition first
				if (prop === 'votes')
					auxVal = this.getVotes(item);
				// if the value is an array we need to merge it with the current item[property] (i.e. tags, projects)
				// array in order not to override it with the new values
				else if (Array.isArray(this.value)) {
					const currentArray = item[prop];
					// these are the items that are not in the array of the original item
					const difference = (auxVal || []).filter(val =>
						!currentArray.some(temp => temp.id === val.id)
					);
					auxVal = [...currentArray, ...difference];
				}
				return ({ id: item.id, [prop]: auxVal });
			});

		return mapped;
	}

	// returns true if the selected type has to reset the ids of the values when updating
	private resetId(choice) {
		switch (choice.type) {
			case 'packaging':
			case 'extendedField':
			case 'price':
				return true;
			default:
				return false;
		}
	}

	private getVotes(item) {
		let votes;
		if (this.like)
			votes = this.thumbSrv.thumbUpFromMulti(item, true);
		else if (this.dislike)
			votes = this.thumbSrv.thumbDownFromMulti(item, true);
		else
			// it could be thumbUpFromMulti or thumbDownFromMulti, we just want to delete the vote
			votes = this.thumbSrv.thumbUpFromMulti(item, false);
		return votes;
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}
}
