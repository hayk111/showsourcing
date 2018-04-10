import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'dialog-footer-app',
	templateUrl: './dialog-footer.component.html',
	styleUrls: ['./dialog-footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexStart]': 'align === "left"',
		'[class.flexEnd]': 'align === "right"',
	}
})
export class DialogFooterComponent {
	@Input() align: 'right' | 'left' = 'right';
}
