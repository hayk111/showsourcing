import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ERM } from '~core/models';


export interface Counts {
	comment?: Observable<number>;
	task?: Observable<number>;
	request?: Observable<number>;
	sample?: Observable<number>;
}

export const tabConfig = [
	{ subtitle: 'Left on this product', title: ERM.COMMENT.plural, type: ERM.COMMENT.singular },
	{ subtitle: 'To complete', title: ERM.TASK.plural, type: ERM.TASK.singular },
	{ subtitle: 'Pending', title: ERM.REQUEST.plural, type: ERM.REQUEST.singular },
	{ subtitle: 'To follow-up', title: ERM.SAMPLE.plural, type: ERM.SAMPLE.singular }
];


@Component({
	selector: 'product-activity-nav-app',
	templateUrl: './product-activity-nav.component.html',
	styleUrls: ['./product-activity-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex' }
})
export class ProductActivityNavComponent {
	@Input() counts: Counts = {};
	@Input() selectedTab = 'comment';
	@Output() tabSelected = new EventEmitter<string>();
	tabConfig = tabConfig;
}
