import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Sample, Supplier, Task } from '~core/models';

@Component({
	selector: 'supplier-docket-app',
	templateUrl: './supplier-docket.component.html',
	styleUrls: ['./supplier-docket.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDocketComponent {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Supplier>();
	@Output() addTask = new EventEmitter<undefined>();
	@Output() addSample = new EventEmitter<undefined>();
	@Output() previewTask = new EventEmitter<Task>();
	@Output() previewSample = new EventEmitter<Sample>();
	@Output() goToTasks = new EventEmitter<null>();
	@Output() goToSamples = new EventEmitter<null>();

	constructor() { }

}
