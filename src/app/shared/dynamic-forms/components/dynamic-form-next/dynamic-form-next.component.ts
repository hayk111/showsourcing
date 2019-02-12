import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef } from '@angular/core';
import { ExtendedField } from '~core/models/extended-field.model';
import { TrackingComponent } from '~utils/tracking-component';
import { ExtendedFieldService } from '~core/entity-services/extended-field/extended-field.service';



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


	constructor(
		private extendedFieldSrv: ExtendedFieldService,
	) { super(); }

	update(field: ExtendedField) {
		this.extendedFieldSrv.update({ id: field.id, value: field.value }).subscribe();
	}

}
