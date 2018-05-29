import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { EditableTextComponent } from '~shared/editable-field/components/editable-text/editable-text.component';
import { Supplier } from '~models';

@Component({
	selector: 'supplier-description-app',
	templateUrl: './supplier-description.component.html',
	styleUrls: ['./supplier-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDescriptionComponent {
	@Input() supplier;
	@ViewChild(EditableTextComponent) editable: EditableTextComponent;
	@ViewChild('txt') textarea: ElementRef;
	@Output() update = new EventEmitter<Supplier>();

	constructor() { }

	edit() {
		this.editable.open();
	}

	/** Since onSave can be triggered when we click outside this component, we need to check if the
	 * editable is actually opened to not trigger unnecessary work
	 */
	onSave(description: string) {
		if (this.editable.isOpen) {
			this.update.emit({ id: this.supplier.id, description });
			this.editable.close();
		}
	}

	cancel() {
		this.editable.close();
		this.textarea.nativeElement.value = this.supplier.description;
	}

}
