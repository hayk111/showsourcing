import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ERM, EntityMetadata } from '~core/models';


export interface Counts {
	comments: Observable<number>;
	tasks: Observable<number>;
	requests: Observable<number>;
	samples: Observable<number>;
}

export const tabConfig = [
	{ subtitle: 'Left on this product', title: ERM.COMMENT.plural },
	{ subtitle: 'To complete', title: ERM.TASK.plural },
	{ subtitle: 'Pending', title: ERM.REQUEST.plural },
	{ subtitle: 'To follow-up', title: ERM.SAMPLE.plural }
];


@Component({
	selector: 'product-activity-nav-app',
	templateUrl: './product-activity-nav.component.html',
	styleUrls: ['./product-activity-nav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActivityNavComponent {
	@Input() counts: Counts;
	@Input() tabSelected: string;
	@Output() tabClicked = new EventEmitter<string>();
	tabConfig = tabConfig;
}
