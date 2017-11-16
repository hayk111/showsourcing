import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver,
				TemplateRef, ComponentFactory, ComponentRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import Log from '../../../../../utils/logger/log.class';
import { InputMap } from '../../interfaces/input-map.interface';
import { FormControlDescriptor } from '../../interfaces/form-control-descriptor.interface';
import { AbstractInput } from '../../interfaces/abstract-input.class';
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
	static inputMap: InputMap;
	@Input() descriptor: FormControlDescriptor;
	@Input() group: FormGroup;
	@Output() controlCreated = new EventEmitter<AbstractControl>();
	@ViewChild('ctnr', { read: ViewContainerRef }) ctnr: ViewContainerRef;
	private componentRef: ComponentRef<any>;

	constructor(private resolver: ComponentFactoryResolver, private fbSrv: FormBuilderService) {
		super();
	}

	ngOnInit() {
		this.createComponent(this.descriptor.type);
	}

	private createComponent(type: string = 'default') {
		this.ctnr.clear();
		let comp = this.fbSrv.inputMap[type];
		comp = comp || this.fbSrv.inputMap.default;
		const factory: ComponentFactory<AbstractInput> = this.resolver.resolveComponentFactory(comp as any);
		this.componentRef = this.ctnr.createComponent(factory);
		const inst = this.componentRef.instance;
		inst.descriptor = this.descriptor;
		inst.controlCreated
		.take(1)
		.takeUntil(this._destroy$)
		.subscribe(ctrl => this.controlCreated.emit(ctrl));
	}
}
