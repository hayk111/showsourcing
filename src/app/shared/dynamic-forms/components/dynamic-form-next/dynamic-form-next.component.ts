import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CustomField } from '~shared/dynamic-forms/models';
import { DynamicFormsService } from '~shared/dynamic-forms/services/dynamic-forms.service';
import { TrackingComponent } from '~utils/tracking-component';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';
import { ExtendedField } from '~core/models/extended-field.model';

@Component({
  selector: 'dynamic-form-next-app',
  templateUrl: './dynamic-form-next.component.html',
  styleUrls: ['./dynamic-form-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormNextComponent extends TrackingComponent {
  @Input() fields: ExtendedField[];
  /** some forms have inline labels which is very annoying but w.e */
  @Input() inlineLabel: boolean;


  constructor(private extendedFieldSrv: ExtendedFieldService) { super(); }

}
