import { Component, OnInit, Input, ViewContainerRef, EventEmitter, Output, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormGroupDescriptor } from '../../interfaces/form-group-descriptor.interface';
import { FormDescriptor } from '../../interfaces/form-descriptor.interface';

@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection : ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
	// we receive a descriptor and we are gonna build the form group with it
	@Input() descriptor: FormDescriptor;
	// when the formGroup is finished building we are gonna send it back to the parent component
	@Output() controlCreated = new EventEmitter<AbstractControl>();
	// formgroup we are going to build
	groups: FormGroup;

	constructor(private fbSrv: FormBuilderService) {
		this.groups = new FormGroup({});
	}

	ngOnInit() {
		this.generateGroups();
	}

	ngAfterViewInit() {
		this.controlCreated.emit(this.groups);
	}

	onControlCreated(groupName: string, ctrl: AbstractControl, name: string) {
		(this.groups.controls[groupName] as FormGroup).addControl(name, ctrl);
	}

	// for each sub group we add a FormGroup to the top level FormGroup
	generateGroups() {
		const groups = this.descriptor.groups;
		if (!groups || groups.length === 0)
			throw Error(`Form descriptor needs to have groups`);
		groups.forEach(g => {
			this.groups.addControl(g.name, new FormGroup({}));
		});
	}

}
