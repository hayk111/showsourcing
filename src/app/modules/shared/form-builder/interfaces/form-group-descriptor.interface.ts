import { FormControlDescriptor } from "./form-control-descriptor.interface";
import { FormGroup } from "@angular/forms";

export interface FormGroupDescriptor{
  name: string;
  fields: Array<FormControlDescriptor>;
  group?: FormGroup;
  class?: string;
}
