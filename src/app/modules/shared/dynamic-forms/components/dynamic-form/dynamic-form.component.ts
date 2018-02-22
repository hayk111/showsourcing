import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroupDescriptor, FormDescriptor } from '../../utils/descriptors.interface';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { DynamicFormGroup } from '../../utils/dynamic-controls.class';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AutoUnsub } from '@utils/index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { take, switchMap, mergeMap, tap } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { selectEntity, selectEntityById } from '../../../../store/selectors/misc/utils.selector';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { ChangeDetectorRef } from '@angular/core';
import { EntityRepresentation, entityRepresentationMap, Entity } from '../../../../store/utils/entities.utils';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	providers: [ DynamicFormComponent ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent extends AutoUnsub {
	@Output() update = new EventEmitter<any>();
	@Input() descriptor: FormDescriptor;
	formGroup: FormGroup;
	private entity$ = new Subject<Entity>();

	@Input()
	set entity(entity: Entity) {
		// we redo the formGroup each time for change detection.
		// ultimately this should be fixed at angular so maybe check if it
		// has been fixed
		this.formGroup = this.dynamicFormsSrv.toFormGroup(this.descriptor);
		this.formGroup.patchValue(entity);
	}

	constructor(private dynamicFormsSrv: DynamicFormsService,
							private store: Store<any>) {
		super();
	}


	getControl(name: string) {
		return this.formGroup.controls[name];
	}

	onUpdate(event) {
		this.update.emit(event);
	}

}

