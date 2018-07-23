import {
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	Host,
	Optional
} from '@angular/core';
import { DialogService } from '~shared/dialog/services/dialog.service';

import { DialogFooterComponent } from '~shared/dialog/components/dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from '~shared/dialog/components/dialog-header/dialog-header.component';

// This is merely a presentational component. The logic for displaying a component is in the container
@Component({
	selector: 'dialog-app',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2',
		'attr.role': 'dialog'
	}
})
export class DialogComponent {
	@Input() closeIcon = true;
	@Output() close = new EventEmitter<any>();
	@ContentChild(DialogFooterComponent) footer: DialogFooterComponent;
	@ContentChild(DialogHeaderComponent) header: DialogHeaderComponent;

	constructor(private srv: DialogService) { }

	get hasFooter() {
		return !!this.footer;
	}

	get hasHeader() {
		return !!this.header;
	}

	doClose() {
		this.srv.close();
		this.close.emit();
	}

	@HostListener('click', ['$event'])
	onClick(event) {
		// stopping propagation so it does not close the modal
		event.stopPropagation();
	}
}
