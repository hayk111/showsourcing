import { Input, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../form-builder/services/form-builder.service';
import { FormGroupDescriptor } from '../../form-builder/interfaces/form-group-descriptor.interface';
import { FormControlDescriptor } from '../../form-builder/interfaces/form-control-descriptor.interface';

export class AbstractInput {
	// input id is so we are sure every input has an unique id
	// useful for labels
	private static inputIdSeed = 0;
	@Input() type: string;
	@Input() required: boolean;
	@Input() placeholder: string;
	@Output() controlCreated = new EventEmitter<AbstractControl>();
	@ViewChild('inp') inpRef;
	private _descriptor: FormControlDescriptor;
	public inputId = AbstractInput.inputIdSeed++;
	public control: AbstractControl;
	public additionalValidators: Array<ValidatorFn> = [];
	public disabled: boolean;

	private onChangeFn: Function;
	private onTouchFn: Function;

	constructor(protected fbSrv: FormBuilderService) {}

	protected createControl(ctrl?: AbstractControl) {
		this.control = ctrl || this.fbSrv.toFormControl(this.descriptor, this.additionalValidators);
		this.controlCreated.emit(this.control);
	}

	@Input()
	set descriptor(desc){
		this.required = desc.required;
		this.type = desc.fieldType || 'text';
		this.placeholder = desc.placeholder || '';
		this._descriptor = desc;
	}

	get descriptor(){
		return this._descriptor;
	}


}
