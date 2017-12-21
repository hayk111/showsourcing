import { Component, OnInit, Input, Injector, Output, EventEmitter, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators/switchMap';
import { NG_VALUE_ACCESSOR, NgControl, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators';
import { EntityRepresentation, Entity } from '../../../../../store/utils/entities.utils';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';
import { selectEntity, selectEntityArray } from '../../../../../store/selectors/utils.selector';

@Component({
	selector: 'input-searchable-entity-select-app',
	templateUrl: './input-searchable-entity-select.component.html',
	styleUrls: ['./input-searchable-entity-select.component.scss'],
	providers: [ makeAccessorProvider(InputSearchableEntitySelectComponent) ]
})
export class InputSearchableEntitySelectComponent extends AbstractInput implements OnInit {
	@Input() entityRep: EntityRepresentation;
	@Input() ctrl: FormControl;
	@Input() multi = false;
	@Output() update = new EventEmitter<any>();
	entities$: Observable<Array<Entity>>;
	private entityState;

	constructor(private store: Store<any>, protected inj: Injector) {
		super(inj);
	}

	ngOnInit() {
		this.store.select(selectEntity(this.entityRep.entityName))
			.takeUntil(this._destroy$)
			.subscribe(state => this.entityState = state);
		this.entities$ = this.store.select(selectEntityArray(this.entityRep));
	}

	onUpdate(v: any) {
		super.onChange(v);
		this.update.emit(v);
	}

	get selected() {
		return this.entityState.byId[this.value];
	}

}
