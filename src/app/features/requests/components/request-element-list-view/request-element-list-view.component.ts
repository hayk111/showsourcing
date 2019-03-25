import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	TemplateRef,
	ViewChild,
	AfterViewChecked,
} from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ExtendedField, RequestElement, ExtendedFieldDefinition } from '~core/models';

@Component({
	selector: 'request-element-list-view-app',
	templateUrl: './request-element-list-view.component.html',
	styleUrls: [
		'./request-element-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementListViewComponent extends ListViewComponent<RequestElement> implements AfterViewChecked {

	@Input() extendedFields: ExtendedFieldDefinition[];
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	constructor(private cdr: ChangeDetectorRef) { super(); }

	ngAfterViewChecked() {
		this.cdr.detectChanges();
	}

	getType(row: RequestElement) {
		switch (row.name) {
			case 'accepted':
				return 'success';
			case 'toReview':
				return 'primary';
			case 'sentToSupplier':
				return 'accent';
			default:
				return 'secondary';
		}
	}

}
