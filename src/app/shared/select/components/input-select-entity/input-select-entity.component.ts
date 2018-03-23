import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AbstractInput, makeAccessorProvider } from '../../../inputs/abstract-input.class';
import { EntityRepresentation, Entity, EntityTarget } from '~entity/models';
import { selectEntityArray } from '~entity/store/entity.selector';

@Component({
	selector: 'input-select-entity-app',
	templateUrl: './input-select-entity.component.html',
	styleUrls: ['./input-select-entity.component.scss'],
	providers: [makeAccessorProvider(InputSelectEntityComponent)],
})
export class InputSelectEntityComponent extends AbstractInput implements OnInit {
	@Input() entityRep: EntityRepresentation;
	@Input() multi = false;
	@Input() panelVisible;
	@Output() itemAdded = new EventEmitter<any>();
	@Output() itemRemoved = new EventEmitter<any>();
	entities$: Observable<Array<Entity>>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.entities$ = this.store.select(selectEntityArray(this.entityRep));
	}

	onUpdate(v: any) {
		super.onChange(v);
		this.update.emit(v);
	}
}
