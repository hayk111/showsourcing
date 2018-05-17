import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, ContentChild, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~utils';

import { DialogName } from '../../models/dialog-names.enum';
import { DialogHeaderComponent } from '../../components/dialog-header/dialog-header.component';
import { DialogFooterComponent } from '../../components/dialog-footer/dialog-footer.component';
import { InputDirective } from '~app/shared/inputs';
import { DialogService } from '~app/shared/dialog/services/dialog.service';

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
export class DialogComponent implements OnInit {
	@Input() closeIcon = true;
	@Input() name: DialogName;
	@Output() close = new EventEmitter<any>();
	@ContentChild(DialogFooterComponent) footer: DialogFooterComponent;
	@ContentChild(DialogHeaderComponent) header: DialogHeaderComponent;


	get hasFooter() {
		return !!this.footer;
	}

	get hasHeader() {
		return !!this.header;
	}

	constructor(private srv: DialogService) { }

	ngOnInit() {
		if (!this.name)
			throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
	}


	doClose() {
		this.srv.close(this.name);
		this.close.emit();
	}

	@HostListener('click', ['$event'])
	onClick(event) {
		// stopping propagation so it does not close the modal
		event.stopPropagation();
	}
}
