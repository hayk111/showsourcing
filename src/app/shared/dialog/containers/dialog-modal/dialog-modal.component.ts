import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'dialog-modal-app',
	templateUrl: './dialog-modal.component.html',
	styleUrls: ['./dialog-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogModalComponent {
	@Input() isOpen;

}
