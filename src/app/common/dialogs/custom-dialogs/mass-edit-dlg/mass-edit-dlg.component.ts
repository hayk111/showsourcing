import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ProductService } from '~core/erm';
import {
	ExtendedFieldDefinitionService,
} from '~core/erm';
import { EntityMetadata, ERM, ExtendedFieldDefinition, EntityName } from '~core/erm';
import { CloseEventType, DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { RatingService } from '~shared/rating/services/rating.service';
import { AutoUnsub, uuid } from '~utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mass-edit-dlg-app',
	templateUrl: './mass-edit-dlg.component.html',
	styleUrls: ['./mass-edit-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MassEditDlgComponent extends AutoUnsub implements OnInit {

	@Input() type: EntityMetadata;
	@Input() items: any[];

	erm = ERM;
	definitions$: Observable<ExtendedFieldDefinition[]>;
	value: any;
	like = false;
	dislike = false;
	pending = false;

	constructor(
		private extendedFDSrv: ExtendedFieldDefinitionService,
		private productSrv: ProductService,
		private dlgSrv: DialogService,
		private ratingSrv: RatingService,
		private notificationSrv: ToastService,
		private translate: TranslateService
	) { super(); }

	ngOnInit() {

	}

	updateChoice(choice) {
		this.value = null;
	}

	// since the dynamic form returns the key of the prop we have to extract it
	// e.g. dynamic form returns -> { category: { data of category } },
	// instead extended form, status selector return just { data of category }
	valueUpdate(item, prop?: string) {
		// this condition exists since input price, when blur drop a change that returns the element in the DOM
		// instead of the price object. This way we don't store the DOM element
		if (item && item.__proto__.constructor.name !== 'Event')
			this.value = prop ? item[prop] : item;
	}

	// TODO extract update logic
	update() {
		this.pending = true;
		// this.choice$.pipe(
		// 	takeUntil(this._destroy$),
		// 	map(choice => this.mapItems(choice)),
		// 	switchMap(items => this.productSrv.updateMany(items))
		// ).subscribe(_ => {
		// 	this.pending = true;
		// 	this.dlgSrv.close();
		// 	this.notificationSrv.add({
		// 		type: ToastType.SUCCESS,
		// 		title: this.translate.instant('title.multiple-edition'),
		// 		message: this.translate.instant('message.your-items-updated'),
		// 		timeout: 3500
		// 	});
		// });

	}

	private mapItems(choice: any) {
		const prop = choice.name;
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
				// if the value2 is an array we need to merge it with the current item[property] (i.e. tags, projects)
				// array in order not to override it with the new value2s
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
		const type = EntityName[this.type.singular];
		let votes;
		if (this.like)
			votes = this.ratingSrv.thumbUpFromMulti(item, true, type);
		else if (this.dislike)
			votes = this.ratingSrv.thumbDownFromMulti(item, true, type);
		else
			// it could be thumbUpFromMulti or thumbDownFromMulti, we just want to delete the vote
			votes = this.ratingSrv.thumbUpFromMulti(item, false, type);
		return votes;
	}

	cancel() {
		this.dlgSrv.cancel();
	}

}
