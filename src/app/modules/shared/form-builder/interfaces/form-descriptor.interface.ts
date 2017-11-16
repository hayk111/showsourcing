import { FormGroup } from "@angular/forms";
import { FormGroupDescriptor } from "./form-group-descriptor.interface";


export interface FormDescriptor{
  groups: Array<FormGroupDescriptor>
}