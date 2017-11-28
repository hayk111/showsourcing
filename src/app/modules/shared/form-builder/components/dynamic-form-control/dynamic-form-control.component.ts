import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver,
				TemplateRef, ComponentFactory, ComponentRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import Log from '../../../../../utils/logger/log.class';
import { InputMap } from '../../interfaces/input-map.interface';
import { FormControlDescriptor } from '../../interfaces/form-control-descriptor.interface';
import { FormBuilderService } from '../../services/form-builder.service';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';

@Component({
	selector: 'dynamic-form-control',
	templateUrl: './dynamic-form-control.component.html',
	styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent extends AutoUnsub implements OnInit {
	// we receive a descriptor, so we know what input in the input map should be taken
	// the input map is in the FormBuilderService
	@Input() descriptor: FormControlDescriptor;
	@Output() controlCreated = new EventEmitter<AbstractControl>();
	// we get a hold of the ctnr since we are gonna put inputs in it
	@ViewChild('ctnr', { read: ViewContainerRef }) ctnr: ViewContainerRef;
	private componentRef: ComponentRef<any>;

	constructor(private resolver: ComponentFactoryResolver, private fbSrv: FormBuilderService) {
		super();
	}

	ngOnInit() {
		this.createComponent(this.descriptor.fieldType);
	}

	private createComponent(fieldType: string = 'default') {
		// redundant step of clearing the container as it should be clear but let's stay on the safe side
		this.ctnr.clear();
		// we get the correct component from the input map
		let comp = this.fbSrv.inputMap[fieldType];
		// if none for this type we get the default one
		comp = comp || this.fbSrv.inputMap.default;
		// create an instance of said component
		const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(comp as any);
		this.componentRef = this.ctnr.createComponent(factory);
		const inst = this.componentRef.instance;
		inst.descriptor = this.descriptor;
		inst.controlCreated
		.take(1)
		.takeUntil(this._destroy$)
		.subscribe(ctrl => this.controlCreated.emit(ctrl));
	}
}
