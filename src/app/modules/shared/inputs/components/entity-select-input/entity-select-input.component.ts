import { Component, OnInit, Injector, OnDestroy, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { AbstractInput } from '../../abstract-input.class';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EntityState } from '../../../../store/utils/entities.utils';
import { selectEntity } from '../../../../store/selectors/utils.selector';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { EntityRepresentation } from '../../../../store/model/filter.model';

@Component({
	selector: 'entity-select-input-app',
	templateUrl: './entity-select-input.component.html',
	styleUrls: ['./entity-select-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => EntitySelectInputComponent),
			multi: true
		}
	]
})
export class EntitySelectInputComponent extends AbstractInput implements OnInit {
	entities$: Observable<EntityState<any>>;
	private subscriptions = [];
	@Input() entityRep: EntityRepresentation;
	@Output() change = new EventEmitter();
	selected: EntityState<any>;
	entities;

	constructor(protected inj: Injector, private store: Store<any>) {
		super(inj);
	}

	ngOnInit() {
		super.ngOnInit();
		this.entities$ = this.store.select(selectEntity(this.entityRep.entityName));
		this.entities$.subscribe(ent => this.entities = ent);
	}

	onChange(value) {
		// TODO: Why the heck doesn't it work without an output ?
		this.change.emit(value);
		super.onChange(value);
	}

	displayFn(entity) {
		return entity ? entity.name : entity;
	}

}
