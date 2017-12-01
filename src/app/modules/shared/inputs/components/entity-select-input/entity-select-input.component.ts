import { Component, OnInit, Injector, OnDestroy, Input, forwardRef } from '@angular/core';
import { AbstractInput } from '../../abstract-input.class';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EntityState } from '../../../../store/utils/entities.utils';
import { selectEntity } from '../../../../store/selectors/utils.selector';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

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
	@Input() metadata: any;

	constructor(protected inj: Injector, private store: Store<any>) {
		super(inj);
	}

	ngOnInit() {
		super.ngOnInit();
		this.entities$ = this.store.select(selectEntity(this.metadata.entity));
	}

}
