import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AbstractExtendedFormComponent } from '../abstract-extended-form.component';


@Component({
	selector: 'extended-form-input-app',
	templateUrl: './extended-form-input.component.html',
	styleUrls: ['./extended-form-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedFormInputComponent extends AbstractExtendedFormComponent {


}
