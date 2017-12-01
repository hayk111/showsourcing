import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroupDescriptor } from '../../utils/descriptors.interface';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { DynamicFormGroup } from '../../utils/dynamic-controls.class';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { take, switchMap, mergeMap } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';

@Component({
	selector: 'dynamic-form-group-app',
	templateUrl: './dynamic-form-group.component.html',
	styleUrls: ['./dynamic-form-group.component.scss']
})
export class DynamicFormGroupComponent extends AutoUnsub implements OnInit {
	@Output() update = new EventEmitter<any>();
	_group: DynamicFormGroup;
	private group$ = new Subject<any>();
	// we want the form even when no item is specified so BehaviorSubject is used.
	private item$ = new BehaviorSubject<any>({});

	constructor(private dynamicFormsSrv: DynamicFormsService) {
		super();
		this.group$.subscribe(g => this._group = g );
		combineLatest(this.group$, this.item$)
		.takeUntil(this._destroy$)
		.subscribe(([group, item]) => {
			this._group = group;
			this._group.reset();
			this._group.patchValue(item);
		});
	}

	ngOnInit() {

	}

	@Input()
	set group(g: DynamicFormGroup) {
		if (!g)
			throw Error(`Group is undefined in DynamicFormGroupComponent. Please specify a group attribute.`);
		this.group$.next(g);
	}

	get group(){
		return this._group;
	}

	@Input()
	set item(item: any) {
		if (item)
			this.item$.next(item);
	}

}
