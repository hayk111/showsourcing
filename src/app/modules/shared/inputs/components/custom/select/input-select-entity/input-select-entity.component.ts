import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { EntityRepresentation, Entity } from '../../../../../../store/utils/entities.utils';
import { ChangeDetectorRef } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../../../../abstract-input.class';
import { Store } from '@ngrx/store';
import { selectEntity, selectEntityArray } from '../../../../../../store/selectors/utils.selector';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'input-select-entity-app',
	templateUrl: './input-select-entity.component.html',
	styleUrls: ['./input-select-entity.component.scss'],
	providers: [ makeAccessorProvider(InputSelectEntityComponent) ]
})
export class InputSelectEntityComponent extends AbstractInput implements OnInit {
	@Input() entityRep: EntityRepresentation;
	@Input() multi = false;
	@Output() itemAdded = new EventEmitter<any>();
	@Output() itemRemoved = new EventEmitter<any>();
	entities$: Observable<Array<Entity>>;

	constructor(protected inj: Injector, protected cd: ChangeDetectorRef, private store: Store<any>) {
		super(inj, cd);
	}

	ngOnInit() {
		this.entities$ = this.store.select(selectEntityArray(this.entityRep));
	}

	onUpdate(v: any) {
		super.onChange(v);
		this.update.emit(v);
	}

}
