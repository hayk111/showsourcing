import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroupDescriptor, FormDescriptor } from '../../utils/descriptors.interface';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { DynamicFormGroup } from '../../utils/dynamic-controls.class';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { take, switchMap, mergeMap } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { FormGroup } from '@angular/forms';
import { EntityRepresentation, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { selectEntity, selectEntityById } from '../../../../store/selectors/utils.selector';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	providers: [ DynamicFormComponent ]
})
export class DynamicFormComponent extends AutoUnsub implements OnInit {
	@Output() update = new EventEmitter<any>();
	@Input() formGroup: FormGroup = new FormGroup({});
	formGroupInit$: Observable<boolean>;
	descriptor: FormDescriptor;
	private _entityId: string;

	@Input() entityRepr: EntityRepresentation = entityRepresentationMap.product;
	// we need a behavior subject because the id is set before we subscribe.
	private _entityId$ = new BehaviorSubject<string>(null);

	@Input()
	set entityId(id: string) {
		this._entityId = id;
		this._entityId$.next(id);
	}

	constructor(private dynamicFormsSrv: DynamicFormsService,
							private store: Store<any>) {
		super();
	}

	ngOnInit() {
		const descriptor$ = this.dynamicFormsSrv.getDescriptor(this.entityRepr)
			.pipe( filter(r => r), take(1) );
		descriptor$
			.takeUntil(this._destroy$)
			.subscribe(desc => this.descriptor = desc);
		// initializes the form with the descriptor
		this.formGroupInit$ = descriptor$
			.takeUntil(this._destroy$)
			.pipe(
				map( desc => this.dynamicFormsSrv.toFormGroup(desc, this.formGroup)),
				map(x => true)
			);
		// when we get a new id we need to patch the form.
		// But the form must be ready.
		this.formGroupInit$.pipe(
			switchMap(_ => this._entityId$),
			filter((id: any) => id),
			switchMap(id => this.selectEntity(this.entityRepr, id))
		).subscribe(entity => this.patch(entity));
	}

	private selectEntity(entityRepr: EntityRepresentation, entityId: string) {
		return this.store.select(selectEntityById(entityRepr.entityName, entityId));
	}

	private patch(entity) {
		this.formGroup.reset();
		this.formGroup.patchValue(entity);
	}

	getControl(name: string) {
		return this.formGroup.controls[name];
	}

	onUpdate(event) {
		this.store.dispatch(this.entityRepr.actionType.patch(this._entityId, event.name, event.value));
	}

}

