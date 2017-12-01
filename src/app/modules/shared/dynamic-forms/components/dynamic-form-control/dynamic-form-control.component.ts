import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef,
	ViewChild, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { DynamicFormControl, DynamicFormGroup } from '../../utils/dynamic-controls.class';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
	selector: 'dynamic-form-control-app',
	templateUrl: './dynamic-form-control.component.html',
	styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent extends AutoUnsub implements OnInit {
	@Input() group: DynamicFormGroup;
	@Input() ctrl: DynamicFormControl;
	@Output() update = new EventEmitter<any>();
	@Output() fileUpload = new EventEmitter<any>();
	// we get a hold of the ctnr since we are gonna put inputs in it
	@ViewChild('ctnr', { read: ViewContainerRef }) ctnr: ViewContainerRef;
	private componentRef: ComponentRef<any>;

	constructor(private resolver: ComponentFactoryResolver,
							private dynamicFormsSrv: DynamicFormsService) {
		super();
	}

	ngOnInit() {
		// TODO:
		// it would be nice to create component dynamically so we can just input our component
		// in a map and pick appropriately. However the below code throws the error:
		// No provider for formCtrl.
		// this.createComponent();
	}

	onUpdate(name, value) {
		debugger;
		// this.update.emit({ name, value });
	}


	private createComponent() {
		// redundant step of clearing the container as it should be clear but let's stay on the safe side
		this.ctnr.clear();
		// we get the correct component from the input map
		let comp = this.dynamicFormsSrv.inputMap[this.ctrl.descriptor.fieldType];
		// if none for this type we get the default one
		comp = comp || this.dynamicFormsSrv.inputMap.default;
		// create an instance of said component
		const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(comp as any);
		this.componentRef = this.ctnr.createComponent(factory);
		const inst = this.componentRef.instance;
		inst.formControl = this.ctrl;
		this.subscribeToEnter(inst);
		this.subscribeToFileUpload(inst);
	}

	private subscribeToEnter(inst) {
		if (inst.enter) {
			inst.enter.takeUntil(this._destroy$)
				.subscribe(evt => this.update.emit());
		}
	}

	private subscribeToFileUpload(inst) {
		if (inst.fileUpload) {
			inst.fileUpload.takeUntil(this._destroy$)
				.subscribe(evt => this.fileUpload.emit());
		}
	}

}
