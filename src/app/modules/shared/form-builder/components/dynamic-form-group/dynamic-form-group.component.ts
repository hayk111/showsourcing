import { Component, OnInit, Input, ViewContainerRef, EventEmitter, Output, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormGroupDescriptor } from '../../interfaces/form-group-descriptor.interface';
import { FormDescriptor } from '../../interfaces/form-descriptor.interface';

@Component({
	selector: 'dynamic-form-group',
	templateUrl: './dynamic-form-group.component.html',
	styleUrls: ['./dynamic-form-group.component.scss'],
	changeDetection : ChangeDetectionStrategy.OnPush
})
export class DynamicFormGroupComponent implements OnInit, AfterViewInit {
	@Input() descriptor: FormDescriptor;
	@Output() controlCreated = new EventEmitter<AbstractControl>();
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

	generateGroups() {
		const groups = this.descriptor.groups;
		if (!groups || groups.length === 0)
			throw Error(`Form descriptor needs to have groups`);
		groups.forEach(g => {
			this.groups.addControl(g.name, new FormGroup({}));
		});
	}

}
