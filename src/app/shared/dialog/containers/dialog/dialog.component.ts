import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DialogFooterComponent } from '~shared/dialog/components/dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from '~shared/dialog/components/dialog-header/dialog-header.component';
import { DialogService } from '~shared/dialog/services/dialog.service';

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
	@Input() hasHeader = true;
	@Input() hasFooter = true;
	@Input() hasBorder = true;
	@Output() close = new EventEmitter<any>();
	@ContentChild(DialogFooterComponent, { static: false }) footer: DialogFooterComponent;
	@ContentChild(DialogHeaderComponent, { static: false }) header: DialogHeaderComponent;

	@Input() headerSpacing = 'ms';

	constructor(private srv: DialogService) { }

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
