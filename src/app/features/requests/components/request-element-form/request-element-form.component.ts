import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestElement, RequestField } from '~core/models';

@Component({
	selector: 'request-element-form-app',
	templateUrl: './request-element-form.component.html',
	styleUrls: ['./request-element-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementFormComponent implements OnInit {

	@Input() requestElement: RequestElement;
	@Output() update = new EventEmitter<RequestField>();

	constructor() { }

	ngOnInit() {
	}

}
