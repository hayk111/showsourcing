import { FormControl } from '@angular/forms';
import { FormControlDescriptor } from '../interfaces/form-control-descriptor.interface';


export class DynamicFormControl extends FormControl {
	descriptor: FormControlDescriptor;

	setValue(v: any) {
		this.descriptor = v;
		super.setValue(v);
	}
}
